import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayerPreviousPage } from './player-previous.page';

describe('PlayerPreviousPage', () => {
  let component: PlayerPreviousPage;
  let fixture: ComponentFixture<PlayerPreviousPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerPreviousPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerPreviousPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
