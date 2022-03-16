import { TestBed } from '@angular/core/testing';

import { DarkthemeService } from './darktheme.service';

describe('DarkthemeService', () => {
  let service: DarkthemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkthemeService);
  });

  /*   it('should be created', () => {
      expect(service).toBeTruthy();
    }); */

  fit("tiene que devolver el string dark", () => {
    service.setDarkMode("dark").then(() => {
      service.getDarkMode().then((data) => {
        expect(data).toBe("dark");
      })

    })
  })
})

