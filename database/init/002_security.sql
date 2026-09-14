BEGIN;

CREATE OR REPLACE FUNCTION app.current_tenant_id()
RETURNS uuid
LANGUAGE sql
STABLE
AS $$
  SELECT NULLIF(current_setting('app.tenant_id', true), '')::uuid
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'nexodocs_app') THEN
    CREATE ROLE nexodocs_app NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'nexodocs_platform_admin') THEN
    CREATE ROLE nexodocs_platform_admin NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE BYPASSRLS;
  END IF;
END;
$$;

GRANT USAGE ON SCHEMA public, app TO nexodocs_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO nexodocs_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO nexodocs_app;
GRANT EXECUTE ON FUNCTION app.current_tenant_id() TO nexodocs_app;
REVOKE INSERT, UPDATE, DELETE ON plans, plan_limits, plan_features, permissions FROM nexodocs_app;

GRANT USAGE ON SCHEMA public, app TO nexodocs_platform_admin;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO nexodocs_platform_admin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO nexodocs_platform_admin;

-- Estas tablas son globales y no llevan RLS: plans, plan_limits,
-- plan_features y permissions. El backend debe restringir sus escrituras.
DO $$
DECLARE table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'tenant_departments','users','roles','role_permissions','user_roles',
    'user_groups','user_group_members','retention_policies','document_categories',
    'document_types','metadata_definitions','expedient_types','expedients',
    'expedient_participants','documents','document_versions','document_metadata_values',
    'tags','document_tags','document_comments','workflow_templates',
    'workflow_template_stages','workflow_template_transitions','workflows',
    'workflow_documents','workflow_tasks','workflow_events','workflow_comments',
    'ocr_jobs','notifications','audit_events','report_templates','tenant_usage_monthly',
    'backup_history','patients','clinical_staff','clinical_histories','clinical_episodes',
    'clinical_document_links','dicom_studies','dicom_series','dicom_instances',
    'task_delegations','user_push_tokens'
  ] LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', table_name);
    EXECUTE format('ALTER TABLE %I FORCE ROW LEVEL SECURITY', table_name);
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON %I USING (tenant_id = app.current_tenant_id()) WITH CHECK (tenant_id = app.current_tenant_id())',
      table_name
    );
  END LOOP;
END;
$$;

ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON tenants
  USING (id = app.current_tenant_id())
  WITH CHECK (id = app.current_tenant_id());

COMMIT;
