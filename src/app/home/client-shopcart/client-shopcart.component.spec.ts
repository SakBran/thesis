import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientShopcartComponent } from './client-shopcart.component';

describe('ClientShopcartComponent', () => {
  let component: ClientShopcartComponent;
  let fixture: ComponentFixture<ClientShopcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientShopcartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientShopcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
