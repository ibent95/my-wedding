import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrnamentComponent } from './ornament.component';

describe('OrnamentComponent', () => {
  let component: OrnamentComponent;
  let fixture: ComponentFixture<OrnamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrnamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrnamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
