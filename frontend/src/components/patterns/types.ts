import { Folder } from "lucide-react";

export type IconType = typeof Folder;

export type Notify = (message: string) => void;

export type ScreenCopy = {
  description: string;
  action?: string;
};
