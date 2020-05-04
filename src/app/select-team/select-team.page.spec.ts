import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectTeamPage } from './select-team.page';

describe('SelectTeamPage', () => {
  let component: SelectTeamPage;
  let fixture: ComponentFixture<SelectTeamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTeamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
