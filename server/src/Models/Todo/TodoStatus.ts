import { registerEnumType } from "type-graphql";

export enum TodoStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE"
}

registerEnumType(TodoStatus, {
  name: 'TodoStatus',
  description: 'Todoの進行状況ステータス'
})