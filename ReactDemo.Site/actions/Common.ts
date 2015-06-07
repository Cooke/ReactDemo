 module Actions {
     export enum Types {
         Search,
         SearchSuccess,
         SearchError
     }

     export interface IActionPayload {
         actionType: Types;
     }
 }