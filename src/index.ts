import 'source-map-support/register';
import { App } from './app';
import { Server } from './bin/server';

export = (new Server()).create(new App());
