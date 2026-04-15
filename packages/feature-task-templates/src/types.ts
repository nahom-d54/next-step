export interface TaskTemplateNode {
  id: string;
  title: string;
  description?: string;
  children?: TaskTemplateNode[];
}

export interface TaskTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  rootTasks: TaskTemplateNode[];
}
