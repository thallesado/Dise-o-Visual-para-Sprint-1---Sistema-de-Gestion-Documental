BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE SCHEMA IF NOT EXISTS app;

CREATE TYPE subscription_status AS ENUM ('TRIAL', 'ACTIVE', 'PAST_DUE', 'SUSPENDED', 'CANCELED');
CREATE TYPE user_status AS ENUM ('INVITED', 'ACTIVE', 'INACTIVE', 'BLOCKED', 'SUSPENDED');
CREATE TYPE expedient_status AS ENUM ('ACTIVE', 'CLOSED', 'ARCHIVED', 'BLOCKED');
CREATE TYPE document_status AS ENUM ('DRAFT', 'PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'CURRENT', 'ARCHIVED', 'VOIDED', 'TRASHED');
CREATE TYPE workflow_status AS ENUM ('DRAFT', 'STARTED', 'IN_PROGRESS', 'PAUSED', 'COMPLETED', 'CANCELED');
CREATE TYPE task_status AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE', 'CANCELED');
CREATE TYPE task_outcome AS ENUM ('APPROVED', 'REJECTED', 'CHANGES_REQUESTED', 'ACKNOWLEDGED');
CREATE TYPE notification_channel AS ENUM ('IN_APP', 'EMAIL', 'PUSH');
CREATE TYPE ocr_status AS ENUM ('QUEUED', 'PROCESSING', 'REQUIRES_VALIDATION', 'VALIDATED', 'INDEXED', 'FAILED');

CREATE OR REPLACE FUNCTION app.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION app.block_mutation()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION '% es append-only: no se permite %', TG_TABLE_NAME, TG_OP;
END;
$$;

-- Plataforma y multitenencia
CREATE TABLE plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code varchar(50) NOT NULL UNIQUE,
  name varchar(100) NOT NULL,
  description text,
  price_monthly numeric(12,2) NOT NULL DEFAULT 0 CHECK (price_monthly >= 0),
  price_yearly numeric(12,2) NOT NULL DEFAULT 0 CHECK (price_yearly >= 0),
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE plan_limits (
  plan_id uuid NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
  resource_key varchar(80) NOT NULL,
  resource_value bigint NOT NULL CHECK (resource_value >= -1),
  unit varchar(30),
  PRIMARY KEY (plan_id, resource_key)
);

CREATE TABLE plan_features (
  plan_id uuid NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
  feature_key varchar(80) NOT NULL,
  is_enabled boolean NOT NULL DEFAULT false,
  description varchar(255),
  PRIMARY KEY (plan_id, feature_key)
);

CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid REFERENCES plans(id),
  name varchar(150) NOT NULL,
  code varchar(50) NOT NULL UNIQUE,
  slug varchar(80) NOT NULL UNIQUE,
  email varchar(150) NOT NULL,
  phone varchar(30),
  address varchar(255),
  logo_url varchar(500),
  primary_color varchar(20) NOT NULL DEFAULT '#087f7b',
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  subscription_status subscription_status NOT NULL DEFAULT 'TRIAL',
  subscription_start_date date,
  subscription_end_date date,
  billing_cycle varchar(10) NOT NULL DEFAULT 'MONTHLY' CHECK (billing_cycle IN ('MONTHLY', 'YEARLY')),
  storage_limit_bytes bigint CHECK (storage_limit_bytes IS NULL OR storage_limit_bytes >= -1),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE tenant_departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name varchar(120) NOT NULL,
  code varchar(40) NOT NULL,
  description varchar(255),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, code)
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid,
  department_id uuid,
  username varchar(80) NOT NULL,
  email varchar(150) NOT NULL,
  password_hash varchar(255) NOT NULL,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  document_type varchar(30),
  document_number varchar(40),
  phone varchar(30),
  status user_status NOT NULL DEFAULT 'ACTIVE',
  is_platform_admin boolean NOT NULL DEFAULT false,
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT ck_users_scope CHECK (tenant_id IS NOT NULL OR is_platform_admin),
  CONSTRAINT fk_users_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
  CONSTRAINT fk_users_department FOREIGN KEY (tenant_id, department_id) REFERENCES tenant_departments(tenant_id, id),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, username),
  UNIQUE (tenant_id, email)
);

CREATE UNIQUE INDEX uq_platform_users_email ON users(lower(email)) WHERE tenant_id IS NULL;
CREATE INDEX idx_users_tenant_status ON users(tenant_id, status) WHERE deleted_at IS NULL;

CREATE TABLE roles (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name varchar(80) NOT NULL,
  description varchar(255),
  is_system boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, name)
);

CREATE TABLE permissions (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code varchar(100) NOT NULL UNIQUE,
  module varchar(50) NOT NULL,
  action varchar(50) NOT NULL,
  description varchar(255),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (module, action)
);

CREATE TABLE role_permissions (
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  role_id bigint NOT NULL,
  permission_id bigint NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  granted_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (tenant_id, role_id) REFERENCES roles(tenant_id, id) ON DELETE CASCADE
);

CREATE TABLE user_roles (
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  role_id bigint NOT NULL,
  assigned_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (tenant_id, user_id) REFERENCES users(tenant_id, id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, role_id) REFERENCES roles(tenant_id, id) ON DELETE CASCADE
);

CREATE TABLE user_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name varchar(100) NOT NULL,
  description varchar(255),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, name)
);

CREATE TABLE user_group_members (
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  group_id uuid NOT NULL,
  user_id uuid NOT NULL,
  joined_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (group_id, user_id),
  FOREIGN KEY (tenant_id, group_id) REFERENCES user_groups(tenant_id, id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, user_id) REFERENCES users(tenant_id, id) ON DELETE CASCADE
);

-- Núcleo documental general
CREATE TABLE retention_policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name varchar(120) NOT NULL,
  retention_months integer CHECK (retention_months IS NULL OR retention_months >= 0),
  disposition_action varchar(30) NOT NULL DEFAULT 'REVIEW' CHECK (disposition_action IN ('REVIEW','ARCHIVE','ANONYMIZE','DELETE')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, name)
);

CREATE TABLE document_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  parent_id uuid,
  name varchar(120) NOT NULL,
  code varchar(50) NOT NULL,
  description varchar(255),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, code),
  FOREIGN KEY (tenant_id, parent_id) REFERENCES document_categories(tenant_id, id)
);

CREATE TABLE document_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  category_id uuid,
  retention_policy_id uuid,
  name varchar(120) NOT NULL,
  code varchar(50) NOT NULL,
  description varchar(255),
  metadata_schema jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, code),
  FOREIGN KEY (tenant_id, category_id) REFERENCES document_categories(tenant_id, id),
  FOREIGN KEY (tenant_id, retention_policy_id) REFERENCES retention_policies(tenant_id, id)
);

CREATE TABLE metadata_definitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  document_type_id uuid,
  name varchar(100) NOT NULL,
  code varchar(60) NOT NULL,
  data_type varchar(30) NOT NULL CHECK (data_type IN ('TEXT','NUMBER','DATE','BOOLEAN','SELECT','MULTISELECT','USER','REFERENCE')),
  options jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_required boolean NOT NULL DEFAULT false,
  is_searchable boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, code),
  FOREIGN KEY (tenant_id, document_type_id) REFERENCES document_types(tenant_id, id) ON DELETE CASCADE
);

CREATE TABLE expedient_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name varchar(120) NOT NULL,
  code varchar(50) NOT NULL,
  metadata_schema jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, code)
);

CREATE TABLE expedients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  expedient_type_id uuid NOT NULL,
  responsible_id uuid,
  department_id uuid,
  code varchar(60) NOT NULL,
  name varchar(200) NOT NULL,
  description text,
  status expedient_status NOT NULL DEFAULT 'ACTIVE',
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  closed_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, code),
  FOREIGN KEY (tenant_id, expedient_type_id) REFERENCES expedient_types(tenant_id, id),
  FOREIGN KEY (tenant_id, responsible_id) REFERENCES users(tenant_id, id),
  FOREIGN KEY (tenant_id, department_id) REFERENCES tenant_departments(tenant_id, id)
);

CREATE TABLE expedient_participants (
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  expedient_id uuid NOT NULL,
  user_id uuid NOT NULL,
  participant_role varchar(50) NOT NULL DEFAULT 'MEMBER',
  added_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (expedient_id, user_id),
  FOREIGN KEY (tenant_id, expedient_id) REFERENCES expedients(tenant_id, id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, user_id) REFERENCES users(tenant_id, id) ON DELETE CASCADE
);

CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  expedient_id uuid,
  document_type_id uuid NOT NULL,
  author_id uuid NOT NULL,
  responsible_id uuid,
  department_id uuid,
  code varchar(60) NOT NULL,
  name varchar(255) NOT NULL,
  description text,
  status document_status NOT NULL DEFAULT 'DRAFT',
  current_version integer NOT NULL DEFAULT 1 CHECK (current_version > 0),
  is_external_source boolean NOT NULL DEFAULT false,
  source varchar(50),
  issue_date date,
  expiry_date date,
  archived_at timestamptz,
  voided_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, code),
  FOREIGN KEY (tenant_id, expedient_id) REFERENCES expedients(tenant_id, id),
  FOREIGN KEY (tenant_id, document_type_id) REFERENCES document_types(tenant_id, id),
  FOREIGN KEY (tenant_id, author_id) REFERENCES users(tenant_id, id),
  FOREIGN KEY (tenant_id, responsible_id) REFERENCES users(tenant_id, id),
  FOREIGN KEY (tenant_id, department_id) REFERENCES tenant_departments(tenant_id, id),
  CONSTRAINT ck_documents_expiry CHECK (expiry_date IS NULL OR issue_date IS NULL OR expiry_date >= issue_date)
);

CREATE INDEX idx_documents_tenant_status ON documents(tenant_id, status) WHERE deleted_at IS NULL;
CREATE INDEX idx_documents_expedient ON documents(tenant_id, expedient_id);
CREATE INDEX idx_documents_type ON documents(tenant_id, document_type_id);

CREATE TABLE document_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  document_id uuid NOT NULL,
  version_number integer NOT NULL CHECK (version_number > 0),
  author_id uuid NOT NULL,
  change_reason varchar(1000) NOT NULL,
  file_path text,
  file_name varchar(255),
  mime_type varchar(150),
  file_size_bytes bigint NOT NULL DEFAULT 0 CHECK (file_size_bytes >= 0),
  checksum_sha256 char(64),
  content jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (document_id, version_number),
  FOREIGN KEY (tenant_id, document_id) REFERENCES documents(tenant_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (tenant_id, author_id) REFERENCES users(tenant_id, id),
  CONSTRAINT ck_sha256_format CHECK (checksum_sha256 IS NULL OR checksum_sha256 ~ '^[0-9a-fA-F]{64}$')
);

CREATE TRIGGER trg_document_versions_no_update BEFORE UPDATE ON document_versions FOR EACH ROW EXECUTE FUNCTION app.block_mutation();
CREATE TRIGGER trg_document_versions_no_delete BEFORE DELETE ON document_versions FOR EACH ROW EXECUTE FUNCTION app.block_mutation();

CREATE TABLE document_metadata_values (
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  document_id uuid NOT NULL,
  metadata_definition_id uuid NOT NULL,
  value jsonb NOT NULL,
  updated_by uuid,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (document_id, metadata_definition_id),
  FOREIGN KEY (tenant_id, document_id) REFERENCES documents(tenant_id, id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, metadata_definition_id) REFERENCES metadata_definitions(tenant_id, id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, updated_by) REFERENCES users(tenant_id, id)
);

CREATE TABLE tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name varchar(80) NOT NULL,
  color varchar(20),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, name)
);

CREATE TABLE document_tags (
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  document_id uuid NOT NULL,
  tag_id uuid NOT NULL,
  PRIMARY KEY (document_id, tag_id),
  FOREIGN KEY (tenant_id, document_id) REFERENCES documents(tenant_id, id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, tag_id) REFERENCES tags(tenant_id, id) ON DELETE CASCADE
);

CREATE TABLE document_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  document_id uuid NOT NULL,
  author_id uuid NOT NULL,
  parent_id uuid,
  comment_text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (tenant_id, id),
  FOREIGN KEY (tenant_id, document_id) REFERENCES documents(tenant_id, id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, author_id) REFERENCES users(tenant_id, id),
  FOREIGN KEY (tenant_id, parent_id) REFERENCES document_comments(tenant_id, id)
);

-- Workflows y tareas
CREATE TABLE workflow_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name varchar(150) NOT NULL,
  description text,
  version integer NOT NULL DEFAULT 1,
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, name, version),
  FOREIGN KEY (tenant_id, created_by) REFERENCES users(tenant_id, id)
);

CREATE TABLE workflow_template_stages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  workflow_template_id uuid NOT NULL,
  name varchar(150) NOT NULL,
  stage_type varchar(30) NOT NULL CHECK (stage_type IN ('START','TASK','REVIEW','APPROVAL','DECISION','ARCHIVE','END')),
  sort_order integer NOT NULL,
  assignment_type varchar(20) CHECK (assignment_type IN ('USER','ROLE','DEPARTMENT','GROUP')),
  assignment_reference varchar(100),
  due_days integer CHECK (due_days IS NULL OR due_days >= 0),
  rules jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, workflow_template_id, id),
  UNIQUE (workflow_template_id, sort_order),
  FOREIGN KEY (tenant_id, workflow_template_id) REFERENCES workflow_templates(tenant_id, id) ON DELETE CASCADE
);

CREATE TABLE workflow_template_transitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  workflow_template_id uuid NOT NULL,
  from_stage_id uuid NOT NULL,
  to_stage_id uuid NOT NULL,
  name varchar(100),
  condition jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE (tenant_id, id),
  FOREIGN KEY (tenant_id, workflow_template_id) REFERENCES workflow_templates(tenant_id, id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, workflow_template_id, from_stage_id) REFERENCES workflow_template_stages(tenant_id, workflow_template_id, id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, workflow_template_id, to_stage_id) REFERENCES workflow_template_stages(tenant_id, workflow_template_id, id) ON DELETE CASCADE,
  CONSTRAINT ck_transition_different_stages CHECK (from_stage_id <> to_stage_id)
);

ALTER TABLE document_types ADD COLUMN workflow_template_id uuid;
ALTER TABLE document_types ADD CONSTRAINT fk_document_types_workflow_template FOREIGN KEY (tenant_id, workflow_template_id) REFERENCES workflow_templates(tenant_id, id);

CREATE TABLE workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  workflow_template_id uuid,
  expedient_id uuid,
  title varchar(255) NOT NULL,
  description text,
  status workflow_status NOT NULL DEFAULT 'DRAFT',
  priority smallint NOT NULL DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
  creator_id uuid NOT NULL,
  current_stage_id uuid,
  started_at timestamptz,
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  FOREIGN KEY (tenant_id, workflow_template_id) REFERENCES workflow_templates(tenant_id, id),
  FOREIGN KEY (tenant_id, expedient_id) REFERENCES expedients(tenant_id, id),
  FOREIGN KEY (tenant_id, creator_id) REFERENCES users(tenant_id, id),
  FOREIGN KEY (tenant_id, current_stage_id) REFERENCES workflow_template_stages(tenant_id, id)
);

CREATE INDEX idx_workflows_tenant_status ON workflows(tenant_id, status);

CREATE TABLE workflow_documents (
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  workflow_id uuid NOT NULL,
  document_id uuid NOT NULL,
  added_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (workflow_id, document_id),
  FOREIGN KEY (tenant_id, workflow_id) REFERENCES workflows(tenant_id, id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, document_id) REFERENCES documents(tenant_id, id) ON DELETE CASCADE
);

CREATE TABLE workflow_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  workflow_id uuid NOT NULL,
  stage_id uuid,
  document_id uuid,
  title varchar(200) NOT NULL,
  description text,
  assigned_user_id uuid,
  assigned_role_id bigint,
  assigned_department_id uuid,
  assigned_group_id uuid,
  status task_status NOT NULL DEFAULT 'PENDING',
  outcome task_outcome,
  priority smallint NOT NULL DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
  document_version integer,
  due_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  completed_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  FOREIGN KEY (tenant_id, workflow_id) REFERENCES workflows(tenant_id, id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, stage_id) REFERENCES workflow_template_stages(tenant_id, id),
  FOREIGN KEY (tenant_id, document_id) REFERENCES documents(tenant_id, id),
  FOREIGN KEY (tenant_id, assigned_user_id) REFERENCES users(tenant_id, id),
  FOREIGN KEY (tenant_id, assigned_role_id) REFERENCES roles(tenant_id, id),
  FOREIGN KEY (tenant_id, assigned_department_id) REFERENCES tenant_departments(tenant_id, id),
  FOREIGN KEY (tenant_id, assigned_group_id) REFERENCES user_groups(tenant_id, id),
  FOREIGN KEY (tenant_id, completed_by) REFERENCES users(tenant_id, id),
  CONSTRAINT ck_task_assignee CHECK (num_nonnulls(assigned_user_id, assigned_role_id, assigned_department_id, assigned_group_id) = 1)
);

CREATE INDEX idx_workflow_tasks_user ON workflow_tasks(tenant_id, assigned_user_id, status);
CREATE INDEX idx_workflow_tasks_due ON workflow_tasks(tenant_id, due_at) WHERE status IN ('PENDING','IN_PROGRESS','OVERDUE');

CREATE TABLE workflow_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  workflow_id uuid NOT NULL,
  task_id uuid,
  document_id uuid,
  event_type varchar(60) NOT NULL,
  performed_by uuid,
  result varchar(50),
  comment text,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  performed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  FOREIGN KEY (tenant_id, workflow_id) REFERENCES workflows(tenant_id, id),
  FOREIGN KEY (tenant_id, task_id) REFERENCES workflow_tasks(tenant_id, id),
  FOREIGN KEY (tenant_id, document_id) REFERENCES documents(tenant_id, id),
  FOREIGN KEY (tenant_id, performed_by) REFERENCES users(tenant_id, id)
);

CREATE TRIGGER trg_workflow_events_no_update BEFORE UPDATE ON workflow_events FOR EACH ROW EXECUTE FUNCTION app.block_mutation();
CREATE TRIGGER trg_workflow_events_no_delete BEFORE DELETE ON workflow_events FOR EACH ROW EXECUTE FUNCTION app.block_mutation();

CREATE TABLE workflow_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  workflow_id uuid NOT NULL,
  task_id uuid,
  document_id uuid,
  author_id uuid NOT NULL,
  comment_text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (tenant_id, id),
  FOREIGN KEY (tenant_id, workflow_id) REFERENCES workflows(tenant_id, id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, task_id) REFERENCES workflow_tasks(tenant_id, id),
  FOREIGN KEY (tenant_id, document_id) REFERENCES documents(tenant_id, id),
  FOREIGN KEY (tenant_id, author_id) REFERENCES users(tenant_id, id)
);

-- Digitalización, notificaciones, auditoría y reportes
CREATE TABLE ocr_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  document_id uuid,
  uploaded_by uuid NOT NULL,
  status ocr_status NOT NULL DEFAULT 'QUEUED',
  original_file_path text NOT NULL,
  file_type varchar(30),
  pages_total integer CHECK (pages_total IS NULL OR pages_total >= 0),
  pages_processed integer NOT NULL DEFAULT 0 CHECK (pages_processed >= 0),
  raw_text text,
  extracted_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  suggested_metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  confidence_score numeric(5,4) CHECK (confidence_score BETWEEN 0 AND 1),
  validated_by uuid,
  validated_at timestamptz,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  FOREIGN KEY (tenant_id, document_id) REFERENCES documents(tenant_id, id),
  FOREIGN KEY (tenant_id, uploaded_by) REFERENCES users(tenant_id, id),
  FOREIGN KEY (tenant_id, validated_by) REFERENCES users(tenant_id, id)
);

CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  channel notification_channel NOT NULL DEFAULT 'IN_APP',
  type varchar(60) NOT NULL,
  title varchar(200) NOT NULL,
  message text NOT NULL,
  related_entity_type varchar(50),
  related_entity_id uuid,
  is_read boolean NOT NULL DEFAULT false,
  read_at timestamptz,
  archived_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  FOREIGN KEY (tenant_id, user_id) REFERENCES users(tenant_id, id) ON DELETE CASCADE
);

CREATE INDEX idx_notifications_user_unread ON notifications(tenant_id, user_id, is_read, created_at DESC);

CREATE TABLE audit_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tenant_id uuid REFERENCES tenants(id) ON DELETE RESTRICT,
  user_id uuid,
  action varchar(80) NOT NULL,
  entity_type varchar(60) NOT NULL,
  entity_id uuid,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  ip_address inet,
  user_agent text,
  result varchar(30) NOT NULL DEFAULT 'SUCCESS',
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  FOREIGN KEY (tenant_id, user_id) REFERENCES users(tenant_id, id)
);

CREATE INDEX idx_audit_tenant_date ON audit_events(tenant_id, occurred_at DESC);
CREATE INDEX idx_audit_entity ON audit_events(tenant_id, entity_type, entity_id);
CREATE TRIGGER trg_audit_events_no_update BEFORE UPDATE ON audit_events FOR EACH ROW EXECUTE FUNCTION app.block_mutation();
CREATE TRIGGER trg_audit_events_no_delete BEFORE DELETE ON audit_events FOR EACH ROW EXECUTE FUNCTION app.block_mutation();

CREATE TABLE report_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  owner_id uuid NOT NULL,
  name varchar(150) NOT NULL,
  description varchar(500),
  report_type varchar(80) NOT NULL,
  selected_fields jsonb NOT NULL,
  filters jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_config jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_shared boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  FOREIGN KEY (tenant_id, owner_id) REFERENCES users(tenant_id, id)
);

CREATE TABLE tenant_usage_monthly (
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  year_month date NOT NULL CHECK (date_trunc('month', year_month)::date = year_month),
  api_calls bigint NOT NULL DEFAULT 0 CHECK (api_calls >= 0),
  ocr_pages bigint NOT NULL DEFAULT 0 CHECK (ocr_pages >= 0),
  documents_created bigint NOT NULL DEFAULT 0 CHECK (documents_created >= 0),
  storage_bytes bigint NOT NULL DEFAULT 0 CHECK (storage_bytes >= 0),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id, year_month)
);

CREATE TABLE backup_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  backup_type varchar(20) NOT NULL DEFAULT 'TENANT' CHECK (backup_type IN ('TENANT','FULL')),
  status varchar(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','RUNNING','COMPLETED','FAILED')),
  created_by uuid,
  file_path text,
  file_size_bytes bigint CHECK (file_size_bytes IS NULL OR file_size_bytes >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  FOREIGN KEY (tenant_id, created_by) REFERENCES users(tenant_id, id)
);

-- Módulo clínico opcional, desacoplado del núcleo documental
CREATE TABLE patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  document_type varchar(30),
  document_number varchar(40),
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  birth_date date,
  gender varchar(30),
  phone varchar(30),
  email varchar(150),
  address varchar(255),
  status varchar(20) NOT NULL DEFAULT 'ACTIVE',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, document_type, document_number)
);

CREATE TABLE clinical_staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  staff_type varchar(30) NOT NULL CHECK (staff_type IN ('PHYSICIAN','NURSE','DIAGNOSTIC_TECH','MEDICAL_AUDITOR','BILLING')),
  specialty varchar(120),
  professional_license varchar(80),
  service_area varchar(120),
  shift varchar(50),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, user_id),
  FOREIGN KEY (tenant_id, user_id) REFERENCES users(tenant_id, id) ON DELETE CASCADE
);

CREATE TABLE clinical_histories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  patient_id uuid NOT NULL,
  code varchar(60) NOT NULL,
  blood_type varchar(10),
  pathological_antecedents text,
  non_pathological_antecedents text,
  family_antecedents text,
  allergies jsonb NOT NULL DEFAULT '[]'::jsonb,
  chronic_conditions text,
  current_medications jsonb NOT NULL DEFAULT '[]'::jsonb,
  observations text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, patient_id, id),
  UNIQUE (tenant_id, patient_id),
  UNIQUE (tenant_id, code),
  FOREIGN KEY (tenant_id, patient_id) REFERENCES patients(tenant_id, id)
);

CREATE TABLE clinical_episodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  clinical_history_id uuid NOT NULL,
  code varchar(60) NOT NULL,
  episode_type varchar(50) NOT NULL,
  started_at timestamptz NOT NULL,
  ended_at timestamptz,
  status varchar(20) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN','CLOSED','CANCELED')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, clinical_history_id, id),
  UNIQUE (tenant_id, code),
  FOREIGN KEY (tenant_id, clinical_history_id) REFERENCES clinical_histories(tenant_id, id)
);

CREATE TABLE clinical_document_links (
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  document_id uuid NOT NULL,
  patient_id uuid NOT NULL,
  clinical_history_id uuid,
  episode_id uuid,
  linked_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (document_id, patient_id),
  FOREIGN KEY (tenant_id, document_id) REFERENCES documents(tenant_id, id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, patient_id) REFERENCES patients(tenant_id, id),
  FOREIGN KEY (tenant_id, patient_id, clinical_history_id) REFERENCES clinical_histories(tenant_id, patient_id, id),
  FOREIGN KEY (tenant_id, clinical_history_id, episode_id) REFERENCES clinical_episodes(tenant_id, clinical_history_id, id)
);

CREATE TABLE dicom_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  patient_id uuid NOT NULL,
  uploader_id uuid NOT NULL,
  study_instance_uid varchar(100) NOT NULL,
  study_date date,
  study_description varchar(255),
  accession_number varchar(50),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, study_instance_uid),
  FOREIGN KEY (tenant_id, patient_id) REFERENCES patients(tenant_id, id),
  FOREIGN KEY (tenant_id, uploader_id) REFERENCES users(tenant_id, id)
);

CREATE TABLE dicom_series (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  study_id uuid NOT NULL,
  series_instance_uid varchar(100) NOT NULL,
  modality varchar(20) NOT NULL,
  series_number integer,
  series_description varchar(255),
  body_part varchar(100),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, series_instance_uid),
  FOREIGN KEY (tenant_id, study_id) REFERENCES dicom_studies(tenant_id, id) ON DELETE CASCADE
);

CREATE TABLE dicom_instances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  series_id uuid NOT NULL,
  sop_instance_uid varchar(100) NOT NULL,
  instance_number integer,
  file_path text NOT NULL,
  file_size_bytes bigint NOT NULL DEFAULT 0 CHECK (file_size_bytes >= 0),
  rows integer,
  columns integer,
  bits_allocated integer,
  window_center numeric,
  window_width numeric,
  pixel_spacing numeric[],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  UNIQUE (tenant_id, sop_instance_uid),
  FOREIGN KEY (tenant_id, series_id) REFERENCES dicom_series(tenant_id, id) ON DELETE CASCADE
);

CREATE INDEX idx_dicom_studies_patient ON dicom_studies(tenant_id, patient_id, study_date DESC);
CREATE INDEX idx_dicom_instances_series ON dicom_instances(tenant_id, series_id, instance_number);

-- Delegaciones y tokens móviles
CREATE TABLE task_delegations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  delegator_id uuid NOT NULL,
  delegate_id uuid NOT NULL,
  starts_on date NOT NULL,
  ends_on date,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, id),
  FOREIGN KEY (tenant_id, delegator_id) REFERENCES users(tenant_id, id),
  FOREIGN KEY (tenant_id, delegate_id) REFERENCES users(tenant_id, id),
  CONSTRAINT ck_delegation_users CHECK (delegator_id <> delegate_id),
  CONSTRAINT ck_delegation_dates CHECK (ends_on IS NULL OR ends_on >= starts_on)
);

CREATE TABLE user_push_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  platform varchar(20) NOT NULL CHECK (platform IN ('WEB','ANDROID','IOS')),
  token text NOT NULL UNIQUE,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_used_at timestamptz,
  UNIQUE (tenant_id, id),
  FOREIGN KEY (tenant_id, user_id) REFERENCES users(tenant_id, id) ON DELETE CASCADE
);

-- updated_at consistente
DO $$
DECLARE table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'plans','tenants','tenant_departments','users','roles','user_groups',
    'retention_policies','document_categories','document_types','metadata_definitions',
    'expedient_types','expedients','documents','document_comments','workflow_templates',
    'workflows','workflow_tasks','workflow_comments','ocr_jobs','report_templates',
    'tenant_usage_monthly','backup_history','patients','clinical_staff','clinical_histories',
    'clinical_episodes','dicom_studies','dicom_series','dicom_instances'
  ] LOOP
    EXECUTE format('CREATE TRIGGER trg_%I_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION app.set_updated_at()', table_name, table_name);
  END LOOP;
END;
$$;

COMMIT;
