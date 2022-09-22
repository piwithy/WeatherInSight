import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Sol, SolList } from './Sol'

@Injectable({
  providedIn: 'root'
})
export class SolService {

  baseURL= "/api/get_sol";

  sols: SolList = {
    "1098": {
      "sol_date": 1098,
      "season": "spring",
      "First_UTC": "2021-12-28T09:37:49Z",
      "Last_UTC": "2021-12-29T10:17:23Z",
      "valid": true,
      "sensors": {
        "AT": {
          "av": -60.566,
          "mn": -93.398,
          "mx": -12.146,
          "ct": 179422
        },
        "HWS": {
          "av": 5.169,
          "mn": 0.284,
          "mx": 19.268,
          "ct": 85838
        },
        "PRE": {
          "av": 619.839,
          "mn": 593.268,
          "mx": 637.532,
          "ct": 92416
        }
      },
      "winds": {
        "0": {
          "compass_degrees": 0.0,
          "compass_point": "N",
          "compass_right": 0.0,
          "compass_up": 1.0,
          "ct": 580
        },
        "1": {
          "compass_degrees": 22.5,
          "compass_point": "NNE",
          "compass_right": 0.382683432365,
          "compass_up": 0.923879532511,
          "ct": 223
        },
        "10": {
          "compass_degrees": 225.0,
          "compass_point": "SW",
          "compass_right": -0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 5554
        },
        "11": {
          "compass_degrees": 247.5,
          "compass_point": "WSW",
          "compass_right": -0.923879532511,
          "compass_up": -0.382683432365,
          "ct": 2967
        },
        "12": {
          "compass_degrees": 270.0,
          "compass_point": "W",
          "compass_right": -1.0,
          "compass_up": 0.0,
          "ct": 16605
        },
        "most_common": {
          "compass_degrees": 270.0,
          "compass_point": "W",
          "compass_right": -1.0,
          "compass_up": 0.0,
          "ct": 16605
        },
        "13": {
          "compass_degrees": 292.5,
          "compass_point": "WNW",
          "compass_right": -0.923879532511,
          "compass_up": 0.382683432365,
          "ct": 12014
        },
        "14": {
          "compass_degrees": 315.0,
          "compass_point": "NW",
          "compass_right": -0.707106781187,
          "compass_up": 0.707106781187,
          "ct": 163
        },
        "15": {
          "compass_degrees": 337.5,
          "compass_point": "NNW",
          "compass_right": -0.382683432365,
          "compass_up": 0.923879532511,
          "ct": 271
        },
        "2": {
          "compass_degrees": 45.0,
          "compass_point": "NE",
          "compass_right": 0.707106781187,
          "compass_up": 0.707106781187,
          "ct": 766
        },
        "3": {
          "compass_degrees": 67.5,
          "compass_point": "ENE",
          "compass_right": 0.923879532511,
          "compass_up": 0.382683432365,
          "ct": 4840
        },
        "5": {
          "compass_degrees": 112.5,
          "compass_point": "ESE",
          "compass_right": 0.923879532511,
          "compass_up": -0.382683432365,
          "ct": 2275
        },
        "6": {
          "compass_degrees": 135.0,
          "compass_point": "SE",
          "compass_right": 0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 6393
        },
        "7": {
          "compass_degrees": 157.5,
          "compass_point": "SSE",
          "compass_right": 0.382683432365,
          "compass_up": -0.923879532511,
          "ct": 11280
        },
        "8": {
          "compass_degrees": 180.0,
          "compass_point": "S",
          "compass_right": 0.0,
          "compass_up": -1.0,
          "ct": 9933
        },
        "9": {
          "compass_degrees": 202.5,
          "compass_point": "SSW",
          "compass_right": -0.382683432365,
          "compass_up": -0.923879532511,
          "ct": 11974
        }
      }
    },
    "1087": {
      "sol_date": 1087,
      "season": "spring",
      "First_UTC": "2021-12-17T02:22:21Z",
      "Last_UTC": "2021-12-17T19:33:42Z",
      "valid": true,
      "sensors": {
        "AT": {
          "av": -55.617,
          "mn": -94.048,
          "mx": -12.977,
          "ct": 123714
        },
        "HWS": {
          "av": 5.331,
          "mn": 0.307,
          "mx": 19.441,
          "ct": 56960
        },
        "PRE": {
          "av": 620.366,
          "mn": 602.688,
          "mx": 632.288,
          "ct": 61887
        }
      },
      "winds": {
        "0": {
          "compass_degrees": 0.0,
          "compass_point": "N",
          "compass_right": 0.0,
          "compass_up": 1.0,
          "ct": 1
        },
        "1": {
          "compass_degrees": 22.5,
          "compass_point": "NNE",
          "compass_right": 0.382683432365,
          "compass_up": 0.923879532511,
          "ct": 15
        },
        "10": {
          "compass_degrees": 225.0,
          "compass_point": "SW",
          "compass_right": -0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 9812
        },
        "11": {
          "compass_degrees": 247.5,
          "compass_point": "WSW",
          "compass_right": -0.923879532511,
          "compass_up": -0.382683432365,
          "ct": 2213
        },
        "12": {
          "compass_degrees": 270.0,
          "compass_point": "W",
          "compass_right": -1.0,
          "compass_up": 0.0,
          "ct": 467
        },
        "2": {
          "compass_degrees": 45.0,
          "compass_point": "NE",
          "compass_right": 0.707106781187,
          "compass_up": 0.707106781187,
          "ct": 23
        },
        "3": {
          "compass_degrees": 67.5,
          "compass_point": "ENE",
          "compass_right": 0.923879532511,
          "compass_up": 0.382683432365,
          "ct": 3489
        },
        "5": {
          "compass_degrees": 112.5,
          "compass_point": "ESE",
          "compass_right": 0.923879532511,
          "compass_up": -0.382683432365,
          "ct": 1469
        },
        "6": {
          "compass_degrees": 135.0,
          "compass_point": "SE",
          "compass_right": 0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 6423
        },
        "7": {
          "compass_degrees": 157.5,
          "compass_point": "SSE",
          "compass_right": 0.382683432365,
          "compass_up": -0.923879532511,
          "ct": 10477
        },
        "8": {
          "compass_degrees": 180.0,
          "compass_point": "S",
          "compass_right": 0.0,
          "compass_up": -1.0,
          "ct": 12707
        },
        "most_common": {
          "compass_degrees": 180.0,
          "compass_point": "S",
          "compass_right": 0.0,
          "compass_up": -1.0,
          "ct": 12707
        },
        "9": {
          "compass_degrees": 202.5,
          "compass_point": "SSW",
          "compass_right": -0.382683432365,
          "compass_up": -0.923879532511,
          "ct": 9864
        }
      }
    },
    "1086": {
      "sol_date": 1086,
      "season": "spring",
      "First_UTC": "2021-12-16T01:42:46Z",
      "Last_UTC": "2021-12-17T02:22:20Z",
      "valid": true,
      "sensors": {
        "AT": {
          "av": -61.626,
          "mn": -95.073,
          "mx": -10.217,
          "ct": 177556
        },
        "HWS": {
          "av": 4.309,
          "mn": 0.276,
          "mx": 20.544,
          "ct": 78906
        },
        "PRE": {
          "av": 620.297,
          "mn": 602.738,
          "mx": 631.618,
          "ct": 153823
        }
      },
      "winds": {
        "0": {
          "compass_degrees": 0.0,
          "compass_point": "N",
          "compass_right": 0.0,
          "compass_up": 1.0,
          "ct": 12
        },
        "1": {
          "compass_degrees": 22.5,
          "compass_point": "NNE",
          "compass_right": 0.382683432365,
          "compass_up": 0.923879532511,
          "ct": 51
        },
        "10": {
          "compass_degrees": 225.0,
          "compass_point": "SW",
          "compass_right": -0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 8074
        },
        "11": {
          "compass_degrees": 247.5,
          "compass_point": "WSW",
          "compass_right": -0.923879532511,
          "compass_up": -0.382683432365,
          "ct": 6220
        },
        "12": {
          "compass_degrees": 270.0,
          "compass_point": "W",
          "compass_right": -1.0,
          "compass_up": 0.0,
          "ct": 15896
        },
        "most_common": {
          "compass_degrees": 270.0,
          "compass_point": "W",
          "compass_right": -1.0,
          "compass_up": 0.0,
          "ct": 15896
        },
        "13": {
          "compass_degrees": 292.5,
          "compass_point": "WNW",
          "compass_right": -0.923879532511,
          "compass_up": 0.382683432365,
          "ct": 2114
        },
        "14": {
          "compass_degrees": 315.0,
          "compass_point": "NW",
          "compass_right": -0.707106781187,
          "compass_up": 0.707106781187,
          "ct": 1
        },
        "15": {
          "compass_degrees": 337.5,
          "compass_point": "NNW",
          "compass_right": -0.382683432365,
          "compass_up": 0.923879532511,
          "ct": 3
        },
        "2": {
          "compass_degrees": 45.0,
          "compass_point": "NE",
          "compass_right": 0.707106781187,
          "compass_up": 0.707106781187,
          "ct": 214
        },
        "3": {
          "compass_degrees": 67.5,
          "compass_point": "ENE",
          "compass_right": 0.923879532511,
          "compass_up": 0.382683432365,
          "ct": 2677
        },
        "5": {
          "compass_degrees": 112.5,
          "compass_point": "ESE",
          "compass_right": 0.923879532511,
          "compass_up": -0.382683432365,
          "ct": 1181
        },
        "6": {
          "compass_degrees": 135.0,
          "compass_point": "SE",
          "compass_right": 0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 5896
        },
        "7": {
          "compass_degrees": 157.5,
          "compass_point": "SSE",
          "compass_right": 0.382683432365,
          "compass_up": -0.923879532511,
          "ct": 9923
        },
        "8": {
          "compass_degrees": 180.0,
          "compass_point": "S",
          "compass_right": 0.0,
          "compass_up": -1.0,
          "ct": 11972
        },
        "9": {
          "compass_degrees": 202.5,
          "compass_point": "SSW",
          "compass_right": -0.382683432365,
          "compass_up": -0.923879532511,
          "ct": 14672
        }
      }
    },
    "1081": {
      "sol_date": 1081,
      "season": "spring",
      "First_UTC": "2021-12-10T23:22:46Z",
      "Last_UTC": "2021-12-11T23:04:24Z",
      "valid": true,
      "sensors": {
        "AT": {
          "av": -55.122,
          "mn": -118.891,
          "mx": -13.051,
          "ct": 264726
        },
        "HWS": {
          "av": 5.273,
          "mn": 0.283,
          "mx": 17.399,
          "ct": 115779
        },
        "PRE": {
          "av": 620.435,
          "mn": 606.592,
          "mx": 637.209,
          "ct": 147072
        }
      },
      "winds": {
        "0": {
          "compass_degrees": 0.0,
          "compass_point": "N",
          "compass_right": 0.0,
          "compass_up": 1.0,
          "ct": 14
        },
        "1": {
          "compass_degrees": 22.5,
          "compass_point": "NNE",
          "compass_right": 0.382683432365,
          "compass_up": 0.923879532511,
          "ct": 2
        },
        "10": {
          "compass_degrees": 225.0,
          "compass_point": "SW",
          "compass_right": -0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 9767
        },
        "11": {
          "compass_degrees": 247.5,
          "compass_point": "WSW",
          "compass_right": -0.923879532511,
          "compass_up": -0.382683432365,
          "ct": 15067
        },
        "12": {
          "compass_degrees": 270.0,
          "compass_point": "W",
          "compass_right": -1.0,
          "compass_up": 0.0,
          "ct": 11864
        },
        "13": {
          "compass_degrees": 292.5,
          "compass_point": "WNW",
          "compass_right": -0.923879532511,
          "compass_up": 0.382683432365,
          "ct": 4459
        },
        "14": {
          "compass_degrees": 315.0,
          "compass_point": "NW",
          "compass_right": -0.707106781187,
          "compass_up": 0.707106781187,
          "ct": 44
        },
        "15": {
          "compass_degrees": 337.5,
          "compass_point": "NNW",
          "compass_right": -0.382683432365,
          "compass_up": 0.923879532511,
          "ct": 26
        },
        "2": {
          "compass_degrees": 45.0,
          "compass_point": "NE",
          "compass_right": 0.707106781187,
          "compass_up": 0.707106781187,
          "ct": 176
        },
        "3": {
          "compass_degrees": 67.5,
          "compass_point": "ENE",
          "compass_right": 0.923879532511,
          "compass_up": 0.382683432365,
          "ct": 6088
        },
        "5": {
          "compass_degrees": 112.5,
          "compass_point": "ESE",
          "compass_right": 0.923879532511,
          "compass_up": -0.382683432365,
          "ct": 2914
        },
        "6": {
          "compass_degrees": 135.0,
          "compass_point": "SE",
          "compass_right": 0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 15656
        },
        "7": {
          "compass_degrees": 157.5,
          "compass_point": "SSE",
          "compass_right": 0.382683432365,
          "compass_up": -0.923879532511,
          "ct": 21240
        },
        "8": {
          "compass_degrees": 180.0,
          "compass_point": "S",
          "compass_right": 0.0,
          "compass_up": -1.0,
          "ct": 24082
        },
        "most_common": {
          "compass_degrees": 180.0,
          "compass_point": "S",
          "compass_right": 0.0,
          "compass_up": -1.0,
          "ct": 24082
        },
        "9": {
          "compass_degrees": 202.5,
          "compass_point": "SSW",
          "compass_right": -0.382683432365,
          "compass_up": -0.923879532511,
          "ct": 4380
        }
      }
    },
    "757": {
      "sol_date": 757,
      "season": "winter",
      "First_UTC": "2021-01-12T00:38:30Z",
      "Last_UTC": "2021-01-13T01:18:05Z",
      "valid": true,
      "sensors": {
        "AT": {
          "av": -36.096,
          "mn": -48.744,
          "mx": -8.092,
          "ct": 84202
        },
        "HWS": {
          "av": 4.263,
          "mn": 0.253,
          "mx": 13.877,
          "ct": 79222
        },
        "PRE": {
          "av": 717.112,
          "mn": 692.627,
          "mx": 734.037,
          "ct": 110247
        }
      },
      "winds": {
        "0": {
          "compass_degrees": 0.0,
          "compass_point": "N",
          "compass_right": 0.0,
          "compass_up": 1.0,
          "ct": 819
        },
        "1": {
          "compass_degrees": 22.5,
          "compass_point": "NNE",
          "compass_right": 0.382683432365,
          "compass_up": 0.923879532511,
          "ct": 933
        },
        "10": {
          "compass_degrees": 225.0,
          "compass_point": "SW",
          "compass_right": -0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 38612
        },
        "most_common": {
          "compass_degrees": 225.0,
          "compass_point": "SW",
          "compass_right": -0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 38612
        },
        "11": {
          "compass_degrees": 247.5,
          "compass_point": "WSW",
          "compass_right": -0.923879532511,
          "compass_up": -0.382683432365,
          "ct": 12479
        },
        "12": {
          "compass_degrees": 270.0,
          "compass_point": "W",
          "compass_right": -1.0,
          "compass_up": 0.0,
          "ct": 11935
        },
        "13": {
          "compass_degrees": 292.5,
          "compass_point": "WNW",
          "compass_right": -0.923879532511,
          "compass_up": 0.382683432365,
          "ct": 3379
        },
        "14": {
          "compass_degrees": 315.0,
          "compass_point": "NW",
          "compass_right": -0.707106781187,
          "compass_up": 0.707106781187,
          "ct": 2038
        },
        "15": {
          "compass_degrees": 337.5,
          "compass_point": "NNW",
          "compass_right": -0.382683432365,
          "compass_up": 0.923879532511,
          "ct": 671
        },
        "2": {
          "compass_degrees": 45.0,
          "compass_point": "NE",
          "compass_right": 0.707106781187,
          "compass_up": 0.707106781187,
          "ct": 348
        },
        "3": {
          "compass_degrees": 67.5,
          "compass_point": "ENE",
          "compass_right": 0.923879532511,
          "compass_up": 0.382683432365,
          "ct": 558
        },
        "5": {
          "compass_degrees": 112.5,
          "compass_point": "ESE",
          "compass_right": 0.923879532511,
          "compass_up": -0.382683432365,
          "ct": 265
        },
        "6": {
          "compass_degrees": 135.0,
          "compass_point": "SE",
          "compass_right": 0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 54
        },
        "7": {
          "compass_degrees": 157.5,
          "compass_point": "SSE",
          "compass_right": 0.382683432365,
          "compass_up": -0.923879532511,
          "ct": 590
        },
        "8": {
          "compass_degrees": 180.0,
          "compass_point": "S",
          "compass_right": 0.0,
          "compass_up": -1.0,
          "ct": 2036
        },
        "9": {
          "compass_degrees": 202.5,
          "compass_point": "SSW",
          "compass_right": -0.382683432365,
          "compass_up": -0.923879532511,
          "ct": 4505
        }
      }
    },
    "741": {
      "sol_date": 741,
      "season": "fall",
      "First_UTC": "2020-12-26T14:05:07Z",
      "Last_UTC": "2020-12-27T14:44:39Z",
      "valid": true,
      "sensors": {
        "AT": {
          "av": -53.742,
          "mn": -94.543,
          "mx": -4.063,
          "ct": 92721
        },
        "HWS": {
          "av": 4.287,
          "mn": 0.236,
          "mx": 12.91,
          "ct": 81204
        },
        "PRE": {
          "av": 715.995,
          "mn": 692.536,
          "mx": 736.954,
          "ct": 120087
        }
      },
      "winds": {
        "0": {
          "compass_degrees": 0.0,
          "compass_point": "N",
          "compass_right": 0.0,
          "compass_up": 1.0,
          "ct": 782
        },
        "1": {
          "compass_degrees": 22.5,
          "compass_point": "NNE",
          "compass_right": 0.382683432365,
          "compass_up": 0.923879532511,
          "ct": 2008
        },
        "10": {
          "compass_degrees": 225.0,
          "compass_point": "SW",
          "compass_right": -0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 26017
        },
        "most_common": {
          "compass_degrees": 225.0,
          "compass_point": "SW",
          "compass_right": -0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 26017
        },
        "11": {
          "compass_degrees": 247.5,
          "compass_point": "WSW",
          "compass_right": -0.923879532511,
          "compass_up": -0.382683432365,
          "ct": 3240
        },
        "12": {
          "compass_degrees": 270.0,
          "compass_point": "W",
          "compass_right": -1.0,
          "compass_up": 0.0,
          "ct": 8574
        },
        "13": {
          "compass_degrees": 292.5,
          "compass_point": "WNW",
          "compass_right": -0.923879532511,
          "compass_up": 0.382683432365,
          "ct": 1269
        },
        "14": {
          "compass_degrees": 315.0,
          "compass_point": "NW",
          "compass_right": -0.707106781187,
          "compass_up": 0.707106781187,
          "ct": 1022
        },
        "15": {
          "compass_degrees": 337.5,
          "compass_point": "NNW",
          "compass_right": -0.382683432365,
          "compass_up": 0.923879532511,
          "ct": 487
        },
        "2": {
          "compass_degrees": 45.0,
          "compass_point": "NE",
          "compass_right": 0.707106781187,
          "compass_up": 0.707106781187,
          "ct": 1784
        },
        "3": {
          "compass_degrees": 67.5,
          "compass_point": "ENE",
          "compass_right": 0.923879532511,
          "compass_up": 0.382683432365,
          "ct": 3279
        },
        "5": {
          "compass_degrees": 112.5,
          "compass_point": "ESE",
          "compass_right": 0.923879532511,
          "compass_up": -0.382683432365,
          "ct": 2537
        },
        "6": {
          "compass_degrees": 135.0,
          "compass_point": "SE",
          "compass_right": 0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 2103
        },
        "7": {
          "compass_degrees": 157.5,
          "compass_point": "SSE",
          "compass_right": 0.382683432365,
          "compass_up": -0.923879532511,
          "ct": 7683
        },
        "8": {
          "compass_degrees": 180.0,
          "compass_point": "S",
          "compass_right": 0.0,
          "compass_up": -1.0,
          "ct": 7984
        },
        "9": {
          "compass_degrees": 202.5,
          "compass_point": "SSW",
          "compass_right": -0.382683432365,
          "compass_up": -0.923879532511,
          "ct": 12435
        }
      }
    },
    /*"740": {
      "sol_date": 740,
      "season": "fall",
      "First_UTC": "2020-12-25T13:25:32Z",
      "Last_UTC": "2020-12-26T14:05:06Z",
      "valid": true,
      "sensors": {
        "AT": {
          "av": -61.341,
          "mn": -94.107,
          "mx": -2.282,
          "ct": 85161
        },
        "HWS": {
          "av": 4.17,
          "mn": 0.186,
          "mx": 13.507,
          "ct": 72487
        },
        "PRE": {
          "av": 714.728,
          "mn": 688.078,
          "mx": 734.206,
          "ct": 83994
        }
      },
      "winds": {
        "0": {
          "compass_degrees": 0.0,
          "compass_point": "N",
          "compass_right": 0.0,
          "compass_up": 1.0,
          "ct": 849
        },
        "1": {
          "compass_degrees": 22.5,
          "compass_point": "NNE",
          "compass_right": 0.382683432365,
          "compass_up": 0.923879532511,
          "ct": 1534
        },
        "10": {
          "compass_degrees": 225.0,
          "compass_point": "SW",
          "compass_right": -0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 17211
        },
        "11": {
          "compass_degrees": 247.5,
          "compass_point": "WSW",
          "compass_right": -0.923879532511,
          "compass_up": -0.382683432365,
          "ct": 1506
        },
        "12": {
          "compass_degrees": 270.0,
          "compass_point": "W",
          "compass_right": -1.0,
          "compass_up": 0.0,
          "ct": 10167
        },
        "13": {
          "compass_degrees": 292.5,
          "compass_point": "WNW",
          "compass_right": -0.923879532511,
          "compass_up": 0.382683432365,
          "ct": 25198
        },
        "most_common": {
          "compass_degrees": 292.5,
          "compass_point": "WNW",
          "compass_right": -0.923879532511,
          "compass_up": 0.382683432365,
          "ct": 25198
        },
        "14": {
          "compass_degrees": 315.0,
          "compass_point": "NW",
          "compass_right": -0.707106781187,
          "compass_up": 0.707106781187,
          "ct": 2489
        },
        "15": {
          "compass_degrees": 337.5,
          "compass_point": "NNW",
          "compass_right": -0.382683432365,
          "compass_up": 0.923879532511,
          "ct": 687
        },
        "2": {
          "compass_degrees": 45.0,
          "compass_point": "NE",
          "compass_right": 0.707106781187,
          "compass_up": 0.707106781187,
          "ct": 334
        },
        "3": {
          "compass_degrees": 67.5,
          "compass_point": "ENE",
          "compass_right": 0.923879532511,
          "compass_up": 0.382683432365,
          "ct": 475
        },
        "5": {
          "compass_degrees": 112.5,
          "compass_point": "ESE",
          "compass_right": 0.923879532511,
          "compass_up": -0.382683432365,
          "ct": 1157
        },
        "6": {
          "compass_degrees": 135.0,
          "compass_point": "SE",
          "compass_right": 0.707106781187,
          "compass_up": -0.707106781187,
          "ct": 337
        },
        "7": {
          "compass_degrees": 157.5,
          "compass_point": "SSE",
          "compass_right": 0.382683432365,
          "compass_up": -0.923879532511,
          "ct": 1699
        },
        "8": {
          "compass_degrees": 180.0,
          "compass_point": "S",
          "compass_right": 0.0,
          "compass_up": -1.0,
          "ct": 2043
        },
        "9": {
          "compass_degrees": 202.5,
          "compass_point": "SSW",
          "compass_right": -0.382683432365,
          "compass_up": -0.923879532511,
          "ct": 6801
        }
      }
    }*/
  };

  constructor(private http: HttpClient) { }

  getUnique(sol_id: number): Observable<SolList>{
    return this.http.get<SolList>(this.baseURL + "?sol_id="+ String(sol_id));
  }

  getLastSols(sol_count: number): Observable<SolList>{
    return this.http.get<SolList>(this.baseURL+ "?last=" + String(sol_count));
  }
}
