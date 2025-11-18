declare module '../../lib/zetajs/zetaHelper' {
  export class ZetaHelperMain {
    thrPort: MessagePort;
    FS: {
      writeFile: (path: string, data: Uint8Array) => void;
      readFile: (path: string) => Uint8Array;
      unlink: (path: string) => void;
    };
    
    constructor(
      threadJs: string,
      options: {
        threadJsType?: 'classic' | 'module';
        wasmPkg?: string;
        blockPageScroll?: boolean;
      }
    );
    
    start(app_init: () => void): void;
  }
}
