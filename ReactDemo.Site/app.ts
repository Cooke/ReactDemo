var dispatcher: Flux.Dispatcher<Actions.IActionPayload>;
var searchStore: Stores.SearchStore;
var backend: Api.BackendApi;

function setupApplication() {
    dispatcher = new Flux.Dispatcher();
    searchStore = new Stores.SearchStore();
    backend = new Api.BackendApi();

    setupRender();
}