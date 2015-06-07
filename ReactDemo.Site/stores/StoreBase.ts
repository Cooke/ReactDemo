module Stores {
    export class StoreBase {
        private changeListeners: Array<() => void> = [];

        constructor() {
            dispatcher.register(this.handleActionInternal);
        }

        public addChangeListener(listener: () => void) {
            this.changeListeners.push(listener);
        }

        public removeChangeListener(listener: () => void) {
            this.changeListeners.splice(this.changeListeners.indexOf(listener), 1);
        }

        protected notifyChange() {
            this.changeListeners.forEach(x => x());
        }

        protected handleAction(payload: Actions.IActionPayload): void {
        }

        private handleActionInternal = (payload: Actions.IActionPayload): void => {
            this.handleAction(payload);
        }
    }
} 