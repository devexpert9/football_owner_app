import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecievedFeePage } from './recieved-fee.page';

describe('RecievedFeePage', () => {
  let component: RecievedFeePage;
  let fixture: ComponentFixture<RecievedFeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievedFeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecievedFeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
