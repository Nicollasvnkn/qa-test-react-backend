import { Injectable, BadRequestException } from '@nestjs/common';

import { OrderItemRepository } from '../repositories/OrderItemRepository';
import { MovieRepository } from '@/modules/movies/application/repositories/MovieRepository';

interface UpdateQuantityOrderItemServiceRequest {
  orderItemId: string;
  quantity: number;
}

@Injectable()
export class UpdateQuantityOrderItemService {
  constructor(
    private orderItemRepository: OrderItemRepository,
    private movieRepository: MovieRepository,
  ) {}

  async execute(data: UpdateQuantityOrderItemServiceRequest): Promise<void> {
    const orderItem = await this.orderItemRepository.findById(data.orderItemId);

    if (!orderItem) {
      throw new BadRequestException('Unable to find item.');
    }

    const movie = await this.movieRepository.findById(orderItem.movieId);

    if (!movie) {
      throw new BadRequestException('Unable to find movie.');
    }

    await this.orderItemRepository.updateQuantityAndAmount(
      data.orderItemId,
      data.quantity,
      movie.price * data.quantity,
    );
  }
}
