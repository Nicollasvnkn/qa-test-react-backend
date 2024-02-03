import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { MovieController } from '../Movie.controller';
import { GetListMoviesService } from '../../../application/services/GetListMovies.service';
import { MovieRepository } from '../../../application/repositories/MovieRepository';

describe('MovieController (integration)', () => {
  let app: INestApplication;
  let getListMoviesService: GetListMoviesService;

  beforeEach(async () => {
    const mockMovieRepository = {
         };

    getListMoviesService = new GetListMoviesService(mockMovieRepository as MovieRepository);
    jest.spyOn(getListMoviesService, 'execute').mockResolvedValue([
	  {
        id: 'fb2606eb-6e17-492e-a7e0-c1ea629f16d0',
        name: 'Viúva Negra',
        imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/viuva-negra.png',
        quantity: 10,
        price: 9.99,
      },
      {
        id: 'adb5d66e-ad97-4439-b9ca-3d2576f697b2',
        name: 'Homem Aranha',
        imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/spider-man.png',
        quantity: 10,
        price: 29.9,
      },
      {
        id: '633e4320-8c35-41dc-9840-8d13c9ba6416',
        name: 'Shang-Chi',
        imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/shang-chi.png',
        quantity: 10,
        price: 30.99,
      },
      {
        id: '400845f4-d3bb-40f7-8af4-5b1a53abe0a5',
        name: 'Morbius',
        imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/morbius-1.png',
        quantity: 10,
        price: 9.99,
      },
      {
        id: '5b66e004-f78b-4b09-b35d-d6c7461f48b9',
        name: 'O Batman',
        imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/the-batman.png',
        quantity: 10,
        price: 30.99,
      },
      {
        id: '6d083db4-df7d-426e-85a9-57455279f49e',
        name: 'Eternos',
        imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/eternals.png',
        quantity: 10,
        price: 29.99,
      }    
    ]);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: GetListMoviesService,
          useValue: getListMoviesService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/GET movie', async () => {
    const expectedMovies = [
      {
        id: 'fb2606eb-6e17-492e-a7e0-c1ea629f16d0',
        name: 'Viúva Negra',
        imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/viuva-negra.png',
        quantity: 10,
        price: 9.99,
      },
      {
        id: 'adb5d66e-ad97-4439-b9ca-3d2576f697b2',
        name: 'Homem Aranha',
        imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/spider-man.png',
        quantity: 10,
        price: 29.9,
      },
      {
        id: '633e4320-8c35-41dc-9840-8d13c9ba6416',
        name: 'Shang-Chi',
        imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/shang-chi.png',
        quantity: 10,
        price: 30.99,
      },
      {
        id: '400845f4-d3bb-40f7-8af4-5b1a53abe0a5',
        name: 'Morbius',
        imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/morbius-1.png',
        quantity: 10,
        price: 9.99,
      },
      {
        id: '5b66e004-f78b-4b09-b35d-d6c7461f48b9',
        name: 'O Batman',
        imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/the-batman.png',
        quantity: 10,
        price: 30.99,
      },
      {
        id: '6d083db4-df7d-426e-85a9-57455279f49e',
        name: 'Eternos',
        imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/eternals.png',
        quantity: 10,
        price: 29.99,
      }
    ];
  
    jest.spyOn(getListMoviesService, 'execute').mockResolvedValueOnce(expectedMovies);
  
    const response = await request(app.getHttpServer()).get('/movie');
  
    expect(response.status).toBe(HttpStatus.OK);
  
    expect(response.body).toEqual(expectedMovies);
  });
});
