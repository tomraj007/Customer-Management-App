import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuatomerListComponent } from './cuatomer-list.component';

describe('CuatomerListComponent', () => {
  let component: CuatomerListComponent;
  let fixture: ComponentFixture<CuatomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuatomerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuatomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
