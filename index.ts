import { App } from './lib/app';
import { Server } from './lib/bin/server';

export = (new Server()).create(new App());
