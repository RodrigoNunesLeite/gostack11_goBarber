import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

/**
 * Sempre que eu fizer uma injeção de dependencia usando
 * HashProvider, ele vai instanciar o BCryptHashProvider
 */
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
