import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SerachResultsPage } from './serach-results.page';

describe('SerachResultsPage', () => {
  let component: SerachResultsPage;
  let fixture: ComponentFixture<SerachResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerachResultsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SerachResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
