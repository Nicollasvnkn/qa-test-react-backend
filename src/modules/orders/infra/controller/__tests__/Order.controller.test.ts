import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest'; 

import { OrderController } from '../Order.controller';
import { BuyOrderService } from '../../../application/services/BuyOrder.service';
import { CreateOrderItemService } from '../../../application/services/CreateOrderItem.service';
import { DeleteOrderItemService } from '../../../application/services/DeleteOrderItem.service';
import { GetByIdOrderItemService } from '../../../application/services/GetByIdOrderItem.service';
import { UpdateQuantityOrderItemService } from '../../../application/services/UpdateQuantityOrderItem.service';

describe('OrderController (e2e)', () => {
  let app: INestApplication;

  const mockBuyOrderService = { execute: jest.fn() };
  const mockCreateOrderItemService = { execute: jest.fn() };
  const mockDeleteOrderItemService = { execute: jest.fn() };
  const mockGetByIdOrderItemService = { execute: jest.fn() };
  const mockUpdateQuantityOrderItemService = { execute: jest.fn() };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        { provide: BuyOrderService, useValue: mockBuyOrderService },
        { provide: CreateOrderItemService, useValue: mockCreateOrderItemService },
        { provide: DeleteOrderItemService, useValue: mockDeleteOrderItemService },
        { provide: GetByIdOrderItemService, useValue: mockGetByIdOrderItemService },
        { provide: UpdateQuantityOrderItemService, useValue: mockUpdateQuantityOrderItemService },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/order (POST)', () => {
    const createOrderDto = { movieId: 'movieId', quantity: 1 };
    return request(app.getHttpServer())
      .post('/order')
      .send(createOrderDto)
      .expect(HttpStatus.CREATED);
  });

  afterAll(async () => {
    await app.close();
  });
});
