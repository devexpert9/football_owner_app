import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPropertyPage } from './add-property.page';

describe('AddPropertyPage', () => {
  let component: AddPropertyPage;
  let fixture: ComponentFixture<AddPropertyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropertyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPropertyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
