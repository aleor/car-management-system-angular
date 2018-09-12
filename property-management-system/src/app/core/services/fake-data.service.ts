import { Car } from "../../shared/models/car.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { PagedResults } from "../../shared/models/paged-results.model";
import 'rxjs/add/observable/of';

@Injectable()
export class FakeDataService {

cars: Car[];

constructor() {
    this.cars = JSON.parse(JSON.stringify(this.data));
}

takeCars(page: number, pageSize: number): Observable<PagedResults<Car[]>> {
    const topVal = pageSize;
    const skipVal = page * pageSize;
    const skip = (isNaN(skipVal)) ? 0 : +skipVal;
    let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

    if (top > this.cars.length) {
        top = skip + (this.cars.length - skip);
    }

    if (pageSize > this.cars.length) {
        pageSize = skip + (this.cars.length - skip);
    }

    var pagedCars = this.cars.slice(skip, top);
    
    const totalRecords = this.cars.length;
    const result = new PagedResults<Car[]>();
    result.results = pagedCars;
    result.totalRecords = totalRecords;

    return Observable.of(result);
}

takeAllCars(): Observable<Car[]> {
    return Observable.of(this.cars);
}

getCar(id: number): Observable<Car> {
    const selectedCar = this.cars.find(x => x.id === id);
    
    return Observable.of(selectedCar);
}

addCar(car: Car): Observable<Car> {
    let postedCar = car;
    let currentMaxId = Math.max.apply(Math, this.cars.map((car) => car.id));
    postedCar.id = currentMaxId++;
    this.cars.unshift(postedCar);
    return Observable.of(postedCar);
}

updateCar(car: Car): Observable<boolean> {
    let putCar = car;
    let id = car.id;
    let status = false;

    for (let i = 0, len = this.cars.length; i < len; i++) {
        if (this.cars[i].id === id) {
            this.cars[i] = putCar;
            status = true;
            break;
        }
    }
    return Observable.of(status);
}

deleteCar(id: number): Observable<boolean> {
    let carId = id;
    for (let i = 0, len = this.cars.length; i < len; i++) {
        if (this.cars[i].id === carId) {
            this.cars.splice(i, 1);
            break;
        }
    }
    return Observable.of(true);
}



    data = [{
        "id": 194093,
        "model": "Ford Fusion",
        "type": "Small family / Compact",
        "isAvailable": true,
        "isDamaged": false,
        "totalBalance": "25,465.56",
        "picture": "http://placehold.it/32x32",
        "age": 3,
        "location": {
            "latitude": "-75.82271",
            "longitude": "-40.169456"
        },
        "address": {
            "city": "Riegelwood",
            "state": "Pennsylvania",
            "country": "US",
            "street": "Linden Boulevard",
            "zip": 4177,
            "building": 841
        },
        "description": "Four-door, five passenger mid-size sedan. Has several driver assistance technologies based on sensors, cameras and radar. Safety features include Lane Keeping System; adjust vehicle speed to changing traffic conditions through adaptive cruise control with Forward Collision Warning.",
        "lastMaintenance": "2017-01-07T10:16:41.147Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "insurance",
                "amount": "-4,355.04",
                "timestamp": 1512846107043
            },
            {
                "id": 1,
                "event": "gasoline & wash",
                "amount": "-2,186.78",
                "timestamp": 1495507786337
            },
            {
                "id": 2,
                "event": "tires",
                "amount": "-3,531.51",
                "timestamp": 1494433367836
            },
            {
                "id": 3,
                "event": "rent income",
                "amount": "3,116.62",
                "timestamp": 1491229887198
            },
            {
                "id": 4,
                "event": "rent income",
                "amount": "2,557.51",
                "timestamp": 1514371195990
            },
            {
                "id": 5,
                "event": "rent income",
                "amount": "1,164.18",
                "timestamp": 1505918718428
            },
            {
                "id": 6,
                "event": "rent income",
                "amount": "6,904.72",
                "timestamp": 1489695177012
            }
        ]
    },
    {
        "id": 62154,
        "model": "Ford Explorer",
        "type": "Crossover SUV",
        "isAvailable": true,
        "isDamaged": false,
        "totalBalance": "-4,076.94",
        "picture": "http://placehold.it/32x32",
        "age": 4,
        "location": {
            "latitude": "16.441722",
            "longitude": "167.554505"
        },
        "address": {
            "city": "Rowe",
            "state": "Idaho",
            "country": "US",
            "street": "Verona Street",
            "zip": 7591,
            "building": 120
        },
        "description": "Upscale cabin; abundant high-tech features; excellent ride and handling balance; available fuel-efficient turbocharged four-cylinder.",
        "lastMaintenance": "2018-03-29T10:09:44.529Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "insurance",
                "amount": "-3,773.43",
                "timestamp": 1504213963205
            },
            {
                "id": 1,
                "event": "repair",
                "amount": "-4,882.22",
                "timestamp": 1506831706398
            },
            {
                "id": 2,
                "event": "rent income",
                "amount": "280.79",
                "timestamp": 1527085115383
            },
            {
                "id": 3,
                "event": "rent income",
                "amount": "4,956.05",
                "timestamp": 1508045509448
            },
            {
                "id": 4,
                "event": "rent income",
                "amount": "1,449.57",
                "timestamp": 1509176647909
            },
            {
                "id": 5,
                "event": "damage (car accident repair)",
                "amount": "-2,935.91",
                "timestamp": 1483930812210
            },
            {
                "id": 6,
                "event": "rent income",
                "amount": "4,167.71",
                "timestamp": 1535491427125
            }
        ]
    },
    {
        "id": 246468,
        "model": "Toyota Camry",
        "type": "Large family / Mid-size",
        "isAvailable": false,
        "isDamaged": true,
        "totalBalance": "20,785.95",
        "picture": "http://placehold.it/32x32",
        "age": 1,
        "location": {
            "latitude": "31.413578",
            "longitude": "-35.32031"
        },
        "address": {
            "city": "Harviell",
            "state": "Washington",
            "country": "US",
            "street": "Fillmore Place",
            "zip": 6187,
            "building": 828
        },
        "description": "2.5 liter 4 Cylinder engine; with top features including the braking assist,​ stability control,​ traction control,​ anti-lock brakes,​ dual airbags,​ side air bag system,​ digital display,​ and airbag deactivation.",
        "lastMaintenance": "2018-04-13T01:47:19.206Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "rent income",
                "amount": "6,189.71",
                "timestamp": 1489522676569
            },
            {
                "id": 1,
                "event": "rent income",
                "amount": "2,845.54",
                "timestamp": 1534899581252
            },
            {
                "id": 2,
                "event": "rent income",
                "amount": "274.18",
                "timestamp": 1493591940513
            },
            {
                "id": 3,
                "event": "gasoline",
                "amount": "-158.17",
                "timestamp": 1533360860106
            },
            {
                "id": 4,
                "event": "maintenance",
                "amount": "-2,121.85",
                "timestamp": 1508675322812
            },
            {
                "id": 5,
                "event": "insurance",
                "amount": "-1,699.17",
                "timestamp": 1493441387427
            },
            {
                "id": 6,
                "event": "rent income",
                "amount": "1,494.87",
                "timestamp": 1486497893954
            },
            {
                "id": 7,
                "event": "rent income",
                "amount": "1,767.86",
                "timestamp": 1521912699633
            },
            {
                "id": 8,
                "event": "rent income",
                "amount": "3,632.83",
                "timestamp": 1501203025965
            }
        ]
    },
    {
        "id": 252977,
        "model": "Toyota RAV 4",
        "type": "Crossover SUV",
        "isAvailable": false,
        "isDamaged": false,
        "totalBalance": "40,925.44",
        "picture": "http://placehold.it/32x32",
        "age": 3,
        "location": {
            "latitude": "21.345681",
            "longitude": "125.020257"
        },
        "address": {
            "city": "Outlook",
            "state": "Maryland",
            "country": "US",
            "street": "Autumn Avenue",
            "zip": 8078,
            "building": 298
        },
        "description": "The vehicle was designed for consumers wanting a vehicle that had most of the benefits of SUVs, such as increased cargo room, higher visibility, and the option of full-time four-wheel drive, along with the maneuverability and fuel economy of a compact car.",
        "lastMaintenance": "2017-08-01T04:33:59.901Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "inurance",
                "amount": "-2,352.25",
                "timestamp": 1507609755407
            },
            {
                "id": 1,
                "event": "registration fees",
                "amount": "-1,908.93",
                "timestamp": 1531460289898
            },
            {
                "id": 2,
                "event": "gasoline & wash",
                "amount": "-767.87",
                "timestamp": 1505132098612
            },
            {
                "id": 3,
                "event": "rent income",
                "amount": "2,778.61",
                "timestamp": 1526647021432
            },
            {
                "id": 4,
                "event": "damage (car accident)",
                "amount": "-4,994.05",
                "timestamp": 1518874055693
            },
            {
                "id": 5,
                "event": "rent income",
                "amount": "6,358.13",
                "timestamp": 1486420659868
            },
            {
                "id": 6,
                "event": "rent income",
                "amount": "1,751.67",
                "timestamp": 1498648408899
            },
            {
                "id": 7,
                "event": "rent income",
                "amount": "4,829.72",
                "timestamp": 1486829160846
            },
            {
                "id": 8,
                "event": "tires",
                "amount": "-1,646.89",
                "timestamp": 1525443733056
            }
        ]
    },
    {
        "id": 275611,
        "model": "Jeep Grand Cherokee",
        "type": "Crossover SUV",
        "isAvailable": true,
        "isDamaged": true,
        "totalBalance": "-3,641.05",
        "picture": "http://placehold.it/32x32",
        "age": 5,
        "location": {
            "latitude": "-22.871078",
            "longitude": "108.065937"
        },
        "address": {
            "city": "Bethpage",
            "state": "Kansas",
            "country": "US",
            "street": "Henderson Walk",
            "zip": 4681,
            "building": 500
        },
        "description": "The fourth-generation Grand Cherokee retains its classic Jeep styling combined with a modern and sleek body style. The interior features leather trim and real wood accents, plus Bluetooth and uConnect electronics options. With the additional awards for the 2011 Grand Cherokee, the Jeep Grand Cherokee has won 30 awards for off-road capability, luxury, value, best-in-class, and safety, making it the most awarded SUV ever.",
        "lastMaintenance": "2017-07-07T17:32:28.307Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "insurance",
                "amount": "-4,473.69",
                "timestamp": 1512826554679
            },
            {
                "id": 1,
                "event": "rent income",
                "amount": "1,490.98",
                "timestamp": 1535344498959
            },
            {
                "id": 2,
                "event": "rent income",
                "amount": "5,330.18",
                "timestamp": 1515997987139
            },
            {
                "id": 3,
                "event": "rent income",
                "amount": "4,366.19",
                "timestamp": 1496573915291
            }
        ]
    },
    {
        "id": 187821,
        "model": "Volkswagen Jetta",
        "type": "Small family / Compact",
        "isAvailable": true,
        "isDamaged": true,
        "totalBalance": "10,269.21",
        "picture": "http://placehold.it/32x32",
        "age": 0,
        "location": {
            "latitude": "-49.005706",
            "longitude": "-57.138793"
        },
        "address": {
            "city": "Esmont",
            "state": "Oklahoma",
            "country": "US",
            "street": "Coles Street",
            "zip": 7653,
            "building": 112
        },
        "description": "The revised 2015 Jetta has secured the highest ratings from most of the key crash testing agencies across the world: Top pick+ in IIHS, 5 stars in NHTSA, 5 stars each in EURONCAP and AUSNCAP. It is recognised as one of the safest vehicles in its class.",
        "lastMaintenance": "2017-09-21T19:01:28.966Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "rent income",
                "amount": "1,878.10",
                "timestamp": 1500947541310
            },
            {
                "id": 1,
                "event": "rent income",
                "amount": "2,516.51",
                "timestamp": 1495037654517
            }
        ]
    },
    {
        "id": 253805,
        "model": "Volkswagen Jetta",
        "type": "Small family / Compact",
        "isAvailable": false,
        "isDamaged": false,
        "totalBalance": "10,115.05",
        "picture": "http://placehold.it/32x32",
        "age": 0,
        "location": {
            "latitude": "43.415717",
            "longitude": "-76.183072"
        },
        "address": {
            "city": "Sena",
            "state": "Missouri",
            "country": "US",
            "street": "Gain Court",
            "zip": 5057,
            "building": 157
        },
        "description": "7th generation. Safety features on the Jetta include an Intelligent Crash Response System (ICRS), and a standard safety cage. An automatic post-collision braking system, a tire pressure monitoring system (TPMS), as well as seven safety and stability-enhancing systems all come as standard equipment.",
        "lastMaintenance": "2017-02-23T05:22:42.792Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "rent income",
                "amount": "5,749.87",
                "timestamp": 1519594463928
            },
            {
                "id": 1,
                "event": "rent income",
                "amount": "674.20",
                "timestamp": 1520416987736
            },
            {
                "id": 2,
                "event": "rent income",
                "amount": "3,673.56",
                "timestamp": 1506228334202
            },
            {
                "id": 3,
                "event": "insurance",
                "amount": "-4,484.77",
                "timestamp": 1518484441194
            },
            {
                "id": 4,
                "event": "car accident (repair)",
                "amount": "-4,642.36",
                "timestamp": 1502533396780
            },
            {
                "id": 5,
                "event": "tires, gasoline & wash",
                "amount": "-3,162.13",
                "timestamp": 1501538387159
            },
            {
                "id": 6,
                "event": "traffic collision",
                "amount": "-4,284.08",
                "timestamp": 1518942047653
            },
            {
                "id": 7,
                "event": "repair",
                "amount": "-2,494.13",
                "timestamp": 1527852732862
            },
            {
                "id": 8,
                "event": "traffic collision",
                "amount": "-4,383.46",
                "timestamp": 1499491174017
            },
            {
                "id": 9,
                "event": "rent income",
                "amount": "6,922.68",
                "timestamp": 1520419819585
            },
            {
                "id": 10,
                "event": "gasoline",
                "amount": "-1,662.51",
                "timestamp": 1514154709700
            },
            {
                "id": 11,
                "event": "rent income",
                "amount": "3,891.35",
                "timestamp": 1504914858335
            }
        ]
    },
    {
        "id": 98045,
        "model": "Ford Explorer",
        "type": "Crossover SUV",
        "isAvailable": false,
        "isDamaged": false,
        "totalBalance": "16,516.67",
        "picture": "http://placehold.it/32x32",
        "age": 1,
        "location": {
            "latitude": "-63.005027",
            "longitude": "-176.48062"
        },
        "address": {
            "city": "Sharon",
            "state": "Palau",
            "country": "US",
            "street": "Norman Avenue",
            "zip": 630,
            "building": 396
        },
        "description": "This Ford Explorer offers a quiet cabin made with quality materials, seating for seven, and a range of engine choices. ",
        "lastMaintenance": "2018-02-09T08:22:25.010Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "rent income",
                "amount": "2,207.30",
                "timestamp": 1484265780469
            },
            {
                "id": 1,
                "event": "rent income",
                "amount": "321.57",
                "timestamp": 1493206848907
            },
            {
                "id": 2,
                "event": "rent income",
                "amount": "3,794.46",
                "timestamp": 1536119897195
            },
            {
                "id": 3,
                "event": "insurance and registration fees",
                "amount": "-4,961.18",
                "timestamp": 1534464949794
            },
            {
                "id": 4,
                "event": "maintenance",
                "amount": "-4,009.53",
                "timestamp": 1510263765328
            },
            {
                "id": 5,
                "event": "rent income",
                "amount": "2,366.30",
                "timestamp": 1521659407326
            },
            {
                "id": 6,
                "event": "tires",
                "amount": "-2,203.18",
                "timestamp": 1484488800266
            },
            {
                "id": 7,
                "event": "gasoline",
                "amount": "-1,749.17",
                "timestamp": 1523782851558
            },
            {
                "id": 8,
                "event": "rent income",
                "amount": "2,026.86",
                "timestamp": 1524783708726
            },
            {
                "id": 9,
                "event": "rent income",
                "amount": "5,517.09",
                "timestamp": 1527133570676
            }
        ]
    },
    {
        "id": 42268,
        "model": "Toyota RAV 4",
        "type": "Crossover SUV",
        "isAvailable": true,
        "isDamaged": false,
        "totalBalance": "-4,457.92",
        "picture": "http://placehold.it/32x32",
        "age": 4,
        "location": {
            "latitude": "33.247739",
            "longitude": "22.778293"
        },
        "address": {
            "city": "Blende",
            "state": "Rhode Island",
            "country": "US",
            "street": "Dunne Place",
            "zip": 4037,
            "building": 567
        },
        "description": "RAV4 offers increased cargo room, higher visibility, and the option of full-time four-wheel drive, along with the maneuverability and fuel economy of a compact car.",
        "lastMaintenance": "2017-12-31T13:11:51.045Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "rent income",
                "amount": "5,398.87",
                "timestamp": 1484662538216
            },
            {
                "id": 1,
                "event": "rent income",
                "amount": "2,498.17",
                "timestamp": 1496017023111
            },
            {
                "id": 2,
                "event": "insurance and registration fees",
                "amount": "-4,560.25",
                "timestamp": 1505413781334
            },
            {
                "id": 3,
                "event": "rent income",
                "amount": "3,637.76",
                "timestamp": 1521751973280
            },
            {
                "id": 4,
                "event": "rent income",
                "amount": "3,579.45",
                "timestamp": 1502748793275
            },
            {
                "id": 5,
                "event": "windshield replacement",
                "amount": "-1,584.19",
                "timestamp": 1502029333365
            },
            {
                "id": 6,
                "event": "rent income",
                "amount": "3,290.75",
                "timestamp": 1496177157129
            },
            {
                "id": 7,
                "event": "traffic collision",
                "amount": "-4,677.59",
                "timestamp": 1496497483986
            },
            {
                "id": 8,
                "event": "gasoline",
                "amount": "-68.34",
                "timestamp": 1503654978454
            }
        ]
    },
    {
        "id": 50405,
        "model": "Toyota Camry",
        "type": "Large family / Mid-size",
        "isAvailable": true,
        "isDamaged": false,
        "totalBalance": "10,370.70",
        "picture": "http://placehold.it/32x32",
        "age": 3,
        "location": {
            "latitude": "2.484907",
            "longitude": "-93.116744"
        },
        "address": {
            "city": "Franklin",
            "state": "Puerto Rico",
            "country": "US",
            "street": "Truxton Street",
            "zip": 6231,
            "building": 568
        },
        "description": "2.5 liter 4 Cylinder engine; with top features including the braking assist,​ stability control,​ traction control,​ anti-lock brakes,​ dual airbags,​ side air bag system,​ digital display,​ and airbag deactivation.",
        "lastMaintenance": "2017-10-12T23:16:29.566Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "rent income",
                "amount": "5,159.76",
                "timestamp": 1535319428195
            },
            {
                "id": 1,
                "event": "gasoline",
                "amount": "-278.46",
                "timestamp": 1520137591650
            },
            {
                "id": 2,
                "event": "rent income",
                "amount": "1,989.21",
                "timestamp": 1488635049288
            },
            {
                "id": 3,
                "event": "rent income",
                "amount": "5,520.50",
                "timestamp": 1526712136097
            },
            {
                "id": 4,
                "event": "rent income",
                "amount": "2,407.11",
                "timestamp": 1508042407998
            },
            {
                "id": 5,
                "event": "wash",
                "amount": "-28.75",
                "timestamp": 1504144943923
            },
            {
                "id": 6,
                "event": "maintenance",
                "amount": "-462.89",
                "timestamp": 1508042941354
            },
            {
                "id": 7,
                "event": "rent income",
                "amount": "2,059.76",
                "timestamp": 1516285711125
            }
        ]
    },
    {
        "id": 178801,
        "model": "Jeep Grand Cherokee",
        "type": "Crossover SUV",
        "isAvailable": true,
        "isDamaged": true,
        "totalBalance": "9,238.13",
        "picture": "http://placehold.it/32x32",
        "age": 3,
        "location": {
            "latitude": "70.131297",
            "longitude": "21.944041"
        },
        "address": {
            "city": "Cataract",
            "state": "Vermont",
            "country": "US",
            "street": "Junius Street",
            "zip": 697,
            "building": 281
        },
        "description": "Modern and sleek body style. The interior features leather trim and real wood accents, plus Bluetooth and uConnect electronics options. With the additional awards for the 2011 Grand Cherokee, the Jeep Grand Cherokee has won 30 awards for off-road capability, luxury, value, best-in-class, and safety, making it the most awarded SUV ever.",
        "lastMaintenance": "2017-03-29T07:47:04.789Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "maintenance",
                "amount": "-377.54",
                "timestamp": 1515447476514
            },
            {
                "id": 1,
                "event": "registration fees",
                "amount": "-819.00",
                "timestamp": 1501514866214
            },
            {
                "id": 2,
                "event": "insurance",
                "amount": "-2,494.26",
                "timestamp": 1499160182714
            },
            {
                "id": 3,
                "event": "rent income",
                "amount": "5,351.11",
                "timestamp": 1530222870370
            },
            {
                "id": 4,
                "event": "maintenance",
                "amount": "-1,206.55",
                "timestamp": 1485865303874
            },
            {
                "id": 5,
                "event": "windshield replacement",
                "amount": "-1,181.43",
                "timestamp": 1497724639878
            },
            {
                "id": 6,
                "event": "car accident",
                "amount": "-2,832.54",
                "timestamp": 1492467571852
            },
            {
                "id": 7,
                "event": "traffic collision",
                "amount": "-3,390.94",
                "timestamp": 1530471731157
            },
            {
                "id": 8,
                "event": "rent income",
                "amount": "4,037.98",
                "timestamp": 1515385549801
            },
            {
                "id": 9,
                "event": "repair",
                "amount": "-3,291.07",
                "timestamp": 1507578877831
            },
            {
                "id": 10,
                "event": "fines",
                "amount": "-1,985.00",
                "timestamp": 1487437607046
            }
        ]
    },
    {
        "id": 244256,
        "model": "Mercedez-Benz C-Class",
        "type": "Luxury / Executive",
        "isAvailable": true,
        "isDamaged": true,
        "totalBalance": "7,690.80",
        "picture": "http://placehold.it/32x32",
        "age": 3,
        "location": {
            "latitude": "72.57797",
            "longitude": "102.305395"
        },
        "address": {
            "city": "Celeryville",
            "state": "Illinois",
            "country": "US",
            "street": "Agate Court",
            "zip": 3956,
            "building": 494
        },
        "description": "5 seater Sedan with a diesel engine (2143 cc) with Automatic transmissions, EBD, ABS, parking sensors and full set of safety features.",
        "lastMaintenance": "2018-08-07T02:00:40.831Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "rent income",
                "amount": "6,762.72",
                "timestamp": 1532593006868
            },
            {
                "id": 1,
                "event": "rent income",
                "amount": "6,599.08",
                "timestamp": 1519363824768
            },
            {
                "id": 2,
                "event": "rent income",
                "amount": "2,928.76",
                "timestamp": 1514533632799
            },
            {
                "id": 3,
                "event": "rent income",
                "amount": "3,651.24",
                "timestamp": 1483614259825
            },
            {
                "id": 4,
                "event": "insurance & registration fees",
                "amount": "-4,330.62",
                "timestamp": 1502044441886
            },
            {
                "id": 5,
                "event": "rent income",
                "amount": "545.61",
                "timestamp": 1486591092023
            },
            {
                "id": 6,
                "event": "maintenance, gasoline & wash",
                "amount": "-4,220.55",
                "timestamp": 1518598617729
            },
            {
                "id": 7,
                "event": "rent income",
                "amount": "3,872.87",
                "timestamp": 1499276441298
            },
            {
                "id": 8,
                "event": "tires replacement",
                "amount": "-2,536.34",
                "timestamp": 1498164167281
            },
            {
                "id": 9,
                "event": "rent income",
                "amount": "6,238.85",
                "timestamp": 1488075732213
            }
        ]
    },
    {
        "id": 269463,
        "model": "Nissan Rogue",
        "type": "Crossover SUV",
        "isAvailable": false,
        "isDamaged": false,
        "totalBalance": "38,464.14",
        "picture": "http://placehold.it/32x32",
        "age": 3,
        "location": {
            "latitude": "72.962646",
            "longitude": "-65.021557"
        },
        "address": {
            "city": "Wedgewood",
            "state": "Nevada",
            "country": "US",
            "street": "Orient Avenue",
            "zip": 8088,
            "building": 439
        },
        "description": "Factory equipped with anti-lock brakes; air conditioning; cruise control; power windows, locks, and mirrors; remote keyless entry; and AM/FM/CD stereo with four speakers and auxiliary input jack.",
        "lastMaintenance": "2018-02-20T07:46:45.578Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "registration fees",
                "amount": "-989.68",
                "timestamp": 1510693833857
            },
            {
                "id": 1,
                "event": "maintenance, gasoline and wash",
                "amount": "-1,723.08",
                "timestamp": 1490816643919
            },
            {
                "id": 2,
                "event": "insurance",
                "amount": "-2,466.11",
                "timestamp": 1498311359130
            },
            {
                "id": 3,
                "event": "rent income",
                "amount": "2,819.46",
                "timestamp": 1528644970674
            },
            {
                "id": 4,
                "event": "rent income",
                "amount": "1,257.18",
                "timestamp": 1489634759971
            },
            {
                "id": 5,
                "event": "repair",
                "amount": "-1,748.25",
                "timestamp": 1523141483947
            },
            {
                "id": 6,
                "event": "rent income",
                "amount": "673.83",
                "timestamp": 1496440952480
            },
            {
                "id": 7,
                "event": "traffic collision",
                "amount": "-3,098.99",
                "timestamp": 1492070640727
            },
            {
                "id": 8,
                "event": "fines",
                "amount": "-672.08",
                "timestamp": 1507098942915
            },
            {
                "id": 9,
                "event": "windshiel replacement",
                "amount": "-1,639.21",
                "timestamp": 1525452930986
            },
            {
                "id": 10,
                "event": "rent income",
                "amount": "4,207.78",
                "timestamp": 1498271294131
            }
        ]
    },
    {
        "id": 153293,
        "model": "Toyota Corolla",
        "type": "Small family / Compact",
        "isAvailable": true,
        "isDamaged": true,
        "totalBalance": "12,227.64",
        "picture": "http://placehold.it/32x32",
        "age": 1,
        "location": {
            "latitude": "-67.779739",
            "longitude": "-124.431691"
        },
        "address": {
            "city": "Collins",
            "state": "Massachusetts",
            "country": "US",
            "street": "Guernsey Street",
            "zip": 4972,
            "building": 772
        },
        "description": "The new Corolla Axio with four-cylinder engine; all-wheel drive. CVT transmissions. 5 seats.",
        "lastMaintenance": "2018-05-04T22:10:56.749Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "rent income",
                "amount": "205.57",
                "timestamp": 1533472160294
            },
            {
                "id": 1,
                "event": "rent income",
                "amount": "4,261.56",
                "timestamp": 1529826879949
            },
            {
                "id": 2,
                "event": "insurance and maintenance fees",
                "amount": "-4,203.21",
                "timestamp": 1521411017680
            },
            {
                "id": 3,
                "event": "gasoline, wash, minor repairments",
                "amount": "-1,411.65",
                "timestamp": 1492195086268
            },
            {
                "id": 4,
                "event": "rent income",
                "amount": "1,447.19",
                "timestamp": 1515757448077
            }
        ]
    },
    {
        "id": 150514,
        "model": "Toyota Camry",
        "type": "Large family / Mid-size",
        "isAvailable": false,
        "isDamaged": true,
        "totalBalance": "-1,228.74",
        "picture": "http://placehold.it/32x32",
        "age": 4,
        "location": {
            "latitude": "-8.347449",
            "longitude": "163.976279"
        },
        "address": {
            "city": "Lorraine",
            "state": "Northern Mariana Islands",
            "country": "US",
            "street": "Holly Street",
            "zip": 1987,
            "building": 585
        },
        "description": "2.5 liter 4 Cylinder engine; with top features including the braking assist,​ stability control,​ traction control,​ anti-lock brakes,​ dual airbags,​ side air bag system,​ digital display,​ and airbag deactivation.",
        "lastMaintenance": "2017-02-16T00:28:04.340Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "rent income",
                "amount": "683.37",
                "timestamp": 1488525821477
            },
            {
                "id": 1,
                "event": "rent income",
                "amount": "2,636.63",
                "timestamp": 1535388783480
            },
            {
                "id": 2,
                "event": "rent income",
                "amount": "4,873.65",
                "timestamp": 1530914374360
            },
            {
                "id": 3,
                "event": "maintenance",
                "amount": "-1,750.90",
                "timestamp": 1515235690025
            },
            {
                "id": 4,
                "event": "gasoline",
                "amount": "-104.57",
                "timestamp": 1523331884510
            },
            {
                "id": 5,
                "event": "rent income",
                "amount": "3,632.36",
                "timestamp": 1494695220912
            },
            {
                "id": 6,
                "event": "insurance",
                "amount": "-4,057.94",
                "timestamp": 1512854873194
            },
            {
                "id": 7,
                "event": "rent income",
                "amount": "5,798.79",
                "timestamp": 1531129783439
            }
        ]
    },
    {
        "id": 75191,
        "model": "Ford Fusion",
        "type": "Small family / Compact",
        "isAvailable": false,
        "isDamaged": false,
        "totalBalance": "3,871.21",
        "picture": "http://placehold.it/32x32",
        "age": 2,
        "location": {
            "latitude": "-46.215061",
            "longitude": "-143.124121"
        },
        "address": {
            "city": "Robinson",
            "state": "Arizona",
            "country": "US",
            "street": "Hegeman Avenue",
            "zip": 4332,
            "building": 868
        },
        "description": "Four-door, five passenger mid-size sedan. Has several driver assistance technologies based on sensors, cameras and radar. Safety features include Lane Keeping System; adjust vehicle speed to changing traffic conditions through adaptive cruise control with Forward Collision Warning.",
        "lastMaintenance": "2017-03-01T10:36:49.951Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "rent income",
                "amount": "2,208.03",
                "timestamp": 1506528234285
            },
            {
                "id": 1,
                "event": "insurance",
                "amount": "-4,675.57",
                "timestamp": 1515032855206
            },
            {
                "id": 2,
                "event": "rent income",
                "amount": "235.22",
                "timestamp": 1525834681794
            },
            {
                "id": 3,
                "event": "rent income",
                "amount": "5,410.39",
                "timestamp": 1525569536767
            },
            {
                "id": 4,
                "event": "maintenance, gasoline and wash",
                "amount": "-1,729.32",
                "timestamp": 1515478255223
            },
            {
                "id": 5,
                "event": "car accident",
                "amount": "-4,241.02",
                "timestamp": 1491336094483
            },
            {
                "id": 6,
                "event": "traffic collision",
                "amount": "-4,556.90",
                "timestamp": 1492236021555
            },
            {
                "id": 7,
                "event": "rent income",
                "amount": "4,650.83",
                "timestamp": 1527009577865
            },
            {
                "id": 8,
                "event": "rent income",
                "amount": "4,331.20",
                "timestamp": 1529486832272
            },
            {
                "id": 9,
                "event": "traffic collision",
                "amount": "-4,260.75",
                "timestamp": 1485773098500
            }
        ]
    },
    {
        "id": 293921,
        "model": "Toyota RAV 4",
        "type": "Crossover SUV",
        "isAvailable": true,
        "isDamaged": false,
        "totalBalance": "39,400.74",
        "picture": "http://placehold.it/32x32",
        "age": 4,
        "location": {
            "latitude": "84.799623",
            "longitude": "15.498685"
        },
        "address": {
            "city": "Duryea",
            "state": "Montana",
            "country": "US",
            "street": "Bedford Avenue",
            "zip": 2445,
            "building": 942
        },
        "description": "Has increased cargo room, higher visibility, and the option of full-time four-wheel drive, along with the maneuverability and fuel economy of a compact car.",
        "lastMaintenance": "2017-12-22T17:36:32.521Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "registration fees, gasoline and wash",
                "amount": "-2,286.99",
                "timestamp": 1502122925446
            },
            {
                "id": 1,
                "event": "rent income",
                "amount": "6,959.65",
                "timestamp": 1521414095992
            },
            {
                "id": 2,
                "event": "maintenance",
                "amount": "-1,230.04",
                "timestamp": 1484459472136
            },
            {
                "id": 3,
                "event": "rent income",
                "amount": "5,541.72",
                "timestamp": 1516736460447
            }
        ]
    },
    {
        "id": 221643,
        "model": "Ford Explorer",
        "type": "Crossover SUV",
        "isAvailable": false,
        "isDamaged": false,
        "totalBalance": "17,499.30",
        "picture": "http://placehold.it/32x32",
        "age": 1,
        "location": {
            "latitude": "-19.665341",
            "longitude": "36.873351"
        },
        "address": {
            "city": "Elbert",
            "state": "Mississippi",
            "country": "US",
            "street": "Ferry Place",
            "zip": 9767,
            "building": 676
        },
        "description": "Upscale cabin; abundant high-tech features; excellent ride and handling balance; available fuel-efficient turbocharged four-cylinder.",
        "lastMaintenance": "2018-01-27T14:06:59.398Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "registration and insurance fees",
                "amount": "-4,715.21",
                "timestamp": 1530682324965
            },
            {
                "id": 1,
                "event": "rent income",
                "amount": "3,723.80",
                "timestamp": 1521393168269
            },
            {
                "id": 2,
                "event": "maintenance",
                "amount": "-1,382.60",
                "timestamp": 1536383722636
            },
            {
                "id": 3,
                "event": "rent income",
                "amount": "2,594.06",
                "timestamp": 1508975068885
            },
            {
                "id": 4,
                "event": "rent income",
                "amount": "961.14",
                "timestamp": 1517026540137
            },
            {
                "id": 5,
                "event": "car accident",
                "amount": "-3,138.53",
                "timestamp": 1530671371876
            },
            {
                "id": 6,
                "event": "rent income",
                "amount": "2,184.30",
                "timestamp": 1497757742878
            },
            {
                "id": 7,
                "event": "rent income",
                "amount": "5,268.82",
                "timestamp": 1528656603128
            }
        ]
    },
    {
        "id": 48169,
        "model": "Mercedez-Benz C-Class",
        "type": "Luxury / Executive",
        "isAvailable": true,
        "isDamaged": true,
        "totalBalance": "31,405.64",
        "picture": "http://placehold.it/32x32",
        "age": 4,
        "location": {
            "latitude": "-47.091349",
            "longitude": "-82.044411"
        },
        "address": {
            "city": "Felt",
            "state": "Louisiana",
            "country": "US",
            "street": "Nichols Avenue",
            "zip": 1827,
            "building": 636
        },
        "description": "5 seater Sedan with a diesel engine (2143 cc) with Automatic transmissions, EBD, ABS, parking sensors and full range of safety features.",
        "lastMaintenance": "2018-05-27T06:16:46.683Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "insurance and registration fees",
                "amount": "-2,782.53",
                "timestamp": 1506179790999
            },
            {
                "id": 1,
                "event": "rent income",
                "amount": "6,066.32",
                "timestamp": 1515587730256
            },
            {
                "id": 2,
                "event": "gasoline",
                "amount": "-70.12",
                "timestamp": 1533827639760
            },
            {
                "id": 3,
                "event": "car damage",
                "amount": "-3,874.36",
                "timestamp": 1487212512855
            }
        ]
    },
    {
        "id": 156302,
        "model": "Toyota Corolla",
        "type": "Small family / Compact",
        "isAvailable": false,
        "isDamaged": true,
        "totalBalance": "44,667.26",
        "picture": "http://placehold.it/32x32",
        "age": 1,
        "location": {
            "latitude": "-88.437739",
            "longitude": "22.722058"
        },
        "address": {
            "city": "Caron",
            "state": "Maine",
            "country": "US",
            "street": "Provost Street",
            "zip": 6047,
            "building": 807
        },
        "description": "The new Corolla Axio with four-cylinder engine; all-wheel drive. CVT transmissions. 5 seats.",
        "lastMaintenance": "2018-06-08T19:27:20.288Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "rent income",
                "amount": "739.98",
                "timestamp": 1506437999570
            },
            {
                "id": 1,
                "event": "gasoline and wash",
                "amount": "-486.31",
                "timestamp": 1499902551277
            },
            {
                "id": 2,
                "event": "maintenance",
                "amount": "-1,215.34",
                "timestamp": 1513936290574
            },
            {
                "id": 3,
                "event": "rent income",
                "amount": "911.34",
                "timestamp": 1527436269462
            },
            {
                "id": 4,
                "event": "car accident",
                "amount": "-3,113.14",
                "timestamp": 1530884436404
            },
            {
                "id": 5,
                "event": "traffic collision",
                "amount": "-3,625.83",
                "timestamp": 1496316189568
            },
            {
                "id": 6,
                "event": "insurance",
                "amount": "-4,333.84",
                "timestamp": 1483413900679
            },
            {
                "id": 7,
                "event": "rent income",
                "amount": "527.15",
                "timestamp": 1486235286669
            },
            {
                "id": 8,
                "event": "rent income",
                "amount": "6,750.19",
                "timestamp": 1531239402123
            }
        ]
    },
    {
        "id": 19110,
        "model": "Nissan Rogue",
        "type": "Crossover SUV",
        "isAvailable": true,
        "isDamaged": false,
        "totalBalance": "19,461.17",
        "picture": "http://placehold.it/32x32",
        "age": 3,
        "location": {
            "latitude": "-76.064809",
            "longitude": "85.803472"
        },
        "address": {
            "city": "Gibbsville",
            "state": "Texas",
            "country": "US",
            "street": "Dekalb Avenue",
            "zip": 2992,
            "building": 836
        },
        "description": "Factory equipped with anti-lock brakes; air conditioning; cruise control; power windows, locks, and mirrors; remote keyless entry; and AM/FM/CD stereo with four speakers and auxiliary input jack.",
        "lastMaintenance": "2018-04-19T13:55:16.211Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "rent income",
                "amount": "4,523.19",
                "timestamp": 1518370098509
            },
            {
                "id": 1,
                "event": "maintenance and registration fees",
                "amount": "-2,237.33",
                "timestamp": 1486488370087
            },
            {
                "id": 2,
                "event": "rent income",
                "amount": "5,728.48",
                "timestamp": 1518657761531
            },
            {
                "id": 3,
                "event": "insurance, gasoline and wash",
                "amount": "-4,020.58",
                "timestamp": 1528495927030
            },
            {
                "id": 4,
                "event": "rent income",
                "amount": "4,791.23",
                "timestamp": 1496878413165
            },
            {
                "id": 5,
                "event": "tires replacement",
                "amount": "-1,253.74",
                "timestamp": 1503421152388
            },
            {
                "id": 6,
                "event": "rent income",
                "amount": "5,257.66",
                "timestamp": 1492455569184
            },
            {
                "id": 7,
                "event": "car accident",
                "amount": "-4,948.90",
                "timestamp": 1525666642914
            },
            {
                "id": 8,
                "event": "rent income",
                "amount": "3,841.32",
                "timestamp": 1492134031023
            },
            {
                "id": 9,
                "event": "windshield replacement",
                "amount": "-1,517.35",
                "timestamp": 1524578762754
            },
            {
                "id": 10,
                "event": "rent income",
                "amount": "3,380.78",
                "timestamp": 1504988797824
            },
            {
                "id": 11,
                "event": "rent income",
                "amount": "4,135.62",
                "timestamp": 1529942575232
            }
        ]
    },
    {
        "id": 26824,
        "model": "Ford Fusion",
        "type": "Small family / Compact",
        "isAvailable": false,
        "isDamaged": false,
        "totalBalance": "41,226.07",
        "picture": "http://placehold.it/32x32",
        "age": 1,
        "location": {
            "latitude": "-34.912274",
            "longitude": "7.528708"
        },
        "address": {
            "city": "Morriston",
            "state": "New Mexico",
            "country": "US",
            "street": "Wyona Street",
            "zip": 7378,
            "building": 309
        },
        "description": "Four-door, five passenger mid-size sedan. Has several driver assistance technologies based on sensors, cameras and radar. Safety features include Lane Keeping System; adjust vehicle speed to changing traffic conditions through adaptive cruise control with Forward Collision Warning; active park assist paired with a backup camera.",
        "lastMaintenance": "2017-07-02T15:27:13.342Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "rent income",
                "amount": "1,251.99",
                "timestamp": 1490084147103
            },
            {
                "id": 1,
                "event": "registration fees, gasoline and wash",
                "amount": "-2,523.51",
                "timestamp": 1536244067884
            },
            {
                "id": 2,
                "event": "rent income",
                "amount": "2,329.10",
                "timestamp": 1486520726172
            },
            {
                "id": 3,
                "event": "rent income",
                "amount": "3,234.31",
                "timestamp": 1500926949336
            },
            {
                "id": 4,
                "event": "rent income",
                "amount": "6,266.81",
                "timestamp": 1503548483515
            },
            {
                "id": 5,
                "event": "insurance",
                "amount": "-4,181.65",
                "timestamp": 1506248796680
            },
            {
                "id": 6,
                "event": "car accident",
                "amount": "-3,046.83",
                "timestamp": 1527417225013
            },
            {
                "id": 7,
                "event": "rent income",
                "amount": "6,194.16",
                "timestamp": 1511672934816
            },
            {
                "id": 8,
                "event": "rent income",
                "amount": "4,412.16",
                "timestamp": 1506565610487
            },
            {
                "id": 9,
                "event": "rent income",
                "amount": "3,201.78",
                "timestamp": 1486215415805
            },
            {
                "id": 10,
                "event": "rent income",
                "amount": "2,846.43",
                "timestamp": 1530934758022
            },
            {
                "id": 11,
                "event": "maintenance",
                "amount": "-938.04",
                "timestamp": 1487415471822
            }
        ]
    },
    {
        "id": 175318,
        "model": "Jeep Grand Cherokee",
        "type": "Crossover SUV",
        "isAvailable": false,
        "isDamaged": false,
        "totalBalance": "16,131.15",
        "picture": "http://placehold.it/32x32",
        "age": 0,
        "location": {
            "latitude": "-82.944151",
            "longitude": "134.409954"
        },
        "address": {
            "city": "Leeper",
            "state": "Georgia",
            "country": "US",
            "street": "Jodie Court",
            "zip": 2638,
            "building": 260
        },
        "description": "The interior features leather trim and real wood accents, plus Bluetooth and uConnect electronics options. With the additional awards for the 2011 Grand Cherokee, the Jeep Grand Cherokee has won 30 awards for off-road capability, luxury, value, best-in-class, and safety, making it the most awarded SUV ever.",
        "lastMaintenance": "2017-07-15T04:52:08.391Z",
        "comments": "",
        "history": [{
                "id": 0,
                "event": "maintenance",
                "amount": "-622.28",
                "timestamp": 1502514246386
            },
            {
                "id": 1,
                "event": "rent income",
                "amount": "4,496.22",
                "timestamp": 1483541034878
            },
            {
                "id": 2,
                "event": "traffic collision",
                "amount": "-3,488.64",
                "timestamp": 1513569696343
            },
            {
                "id": 3,
                "event": "rent income",
                "amount": "1,707.69",
                "timestamp": 1520336802743
            },
            {
                "id": 4,
                "event": "rent income",
                "amount": "6,620.23",
                "timestamp": 1520763152537
            },
            {
                "id": 5,
                "event": "insurance",
                "amount": "-4,498.41",
                "timestamp": 1526208066698
            }
        ]
    }
];
}