import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayerUpcomingPage } from './player-upcoming.page';

describe('PlayerUpcomingPage', () => {
  let component: PlayerUpcomingPage;
  let fixture: ComponentFixture<PlayerUpcomingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerUpcomingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerUpcomingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
