import { AbstractRouteController } from '../AbstractRouteController';

export class HelloWorldRouteController extends AbstractRouteController {
    constructor() {
        super('/helloworld');
        this.InitializeController();
    }
}
