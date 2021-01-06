import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiderEarningListComponent } from './rider-earning-list.component';

describe('RiderEarningListComponent', () => {
  let component: RiderEarningListComponent;
  let fixture: ComponentFixture<RiderEarningListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderEarningListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiderEarningListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
