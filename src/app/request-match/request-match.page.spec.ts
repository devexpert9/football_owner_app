import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestMatchPage } from './request-match.page';

describe('RequestMatchPage', () => {
  let component: RequestMatchPage;
  let fixture: ComponentFixture<RequestMatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestMatchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
