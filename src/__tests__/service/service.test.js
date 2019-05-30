import CarsService from '../../service';

jest.mock('../../service/', () => {
    return class CarsService {
        fetchList = () => {
            return new Promise(resolve => {
                resolve(JSON.stringify({
                    "cars": [{
                        "stockNumber": 17711,
                        "manufacturerName": "Fiat",
                        "modelName": "500X",
                        "color": "black",
                        "mileage": {"number": 106694, "unit": "km"},
                        "fuelType": "Petrol",
                        "pictureUrl": "http://localhost:3001/car.svg"
                    }, {
                        "stockNumber": 17712,
                        "manufacturerName": "Fiat",
                        "modelName": "500X",
                        "color": "black",
                        "mileage": {"number": 106694, "unit": "km"},
                        "fuelType": "Petrol",
                        "pictureUrl": "http://localhost:3001/car.svg"
                    }]
                }));
            })
        };
    }
});

describe("Fetch results from mock api", () => {
    it('should render results text with values', done => {
        const service = new CarsService();

        const fetchMock = service.fetchList();
        fetchMock.then((response) => {
            const json = JSON.parse(response);
            expect(json.cars.length).toBe(2);
            done();
        });
    });
});



