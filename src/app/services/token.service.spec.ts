import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  let storage: Storage;



  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Storage,
      ],
    });
    service = TestBed.inject(TokenService);
    storage = new Storage();

  });

  /* it('should be created', () => {
    expect(service).toBeTruthy();
  }); */

  fit("addData() devuelve 'contenido'", async () => {
    await service.addData("key", "contenido").then(async () => {
      await service.getData("key").then((data) => {
        expect(data).toBe("contenid");
      })
    })
  })
});
