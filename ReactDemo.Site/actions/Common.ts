 module Actions {
     export enum ActionType {
         Search,
         SearchSuccess,
         SearchError
     }

     export interface IActionPayload {
         actionType: ActionType;
     }
 }