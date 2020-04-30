import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FieldRequestsPage } from './field-requests.page';

describe('FieldRequestsPage', () => {
  let component: FieldRequestsPage;
  let fixture: ComponentFixture<FieldRequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldRequestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FieldRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
