function num_2_str(number) {
    if (number < 10)
        return '0' + number;
    return number
}

function date_format(date, lang) {
    if (!date instanceof Date) {
        throw "date not Type Date";
    }
    let months = {};
    switch (lang) {
        case 'fr':
            months = {
                0: 'Janvier',
                1: 'Fevrier',
                2: 'Mars',
                3: 'Avril',
                4: 'Mai',
                5: 'Juin',
                6: 'Juillet',
                7: 'Août',
                8: 'Septembre',
                9: 'Octobre',
                10: 'Novembre',
                11: 'Decembre'
            };
            return num_2_str(date.getDate()) + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() + ' ' + num_2_str(date.getHours()) + ':' + num_2_str(date.getMinutes()) + ':' + num_2_str(date.getSeconds()) + '';
        case 'en':
            months = {
                0: 'January',
                1: 'February',
                2: 'March',
                3: 'April',
                4: 'May',
                5: 'June',
                6: 'July',
                7: 'August',
                8: 'September',
                9: 'October',
                10: 'November',
                11: 'December'
            };
            let utc_date = date.getDate();
            if (utc_date === 1 || utc_date === 21 || utc_date === 31)
                utc_date += 'st';
            else if (utc_date === 2 || utc_date === 22)
                utc_date += 'nd';
            else if (utc_date === 3 || utc_date === 23)
                utc_date += 'rd';
            else
                utc_date += 'th';
            let ampm = '';
            let hours = date.getHours();
            if (hours > 12) {
                hours = num_2_str(hours - 12);
                ampm = 'PM'
            } else {
                hours = num_2_str(hours);
                ampm = 'AM'
            }
            return months[date.getMonth()] + ', ' + utc_date + ' ' + date.getFullYear() + ' ' + hours + ':' + num_2_str(date.getMinutes()) + ':' + num_2_str(date.getSeconds()) + ampm + '';
        default:
            throw "Unknown Language: " + lang
    }
}

function is_valid(valid, lang) {
    if (lang === 'fr') {
        if (valid > 0) {
            return 'Oui'
        } else {
            return 'Non'
        }
    } else {
        if (valid > 0) {
            return 'Yes'
        } else {
            return 'No'
        }
    }

}

function unit_converter(sensor, value, lang) {
    if (lang === 'fr') {
        if (sensor === 'AT') {
            return value.toFixed(3) + " °C"
        } else if (sensor === 'PRE') {
            return pa_2_mbar(value).toFixed(3) + "*10<sup>-3</sup></sup> Bar"
        } else if (sensor === 'HWS') {
            return mps_2_kph(value).toFixed(3) + " km/h"
        }
    } else {
        if (sensor === 'AT') {
            return celsius_2_fahrenheit(value).toFixed(3) + " °F"
        } else if (sensor === 'PRE') {
            return pa_2_psi(value).toFixed(3) + " PSI"
        } else if (sensor === 'HWS') {
            return mps_2_mph(value).toFixed(3) + " mph"
        }
    }
}

function sortByKey(jsObj) {
    var sortedArray = [];

    // Push each JSON Object entry in array by [key, value]
    for (var i in jsObj) {
        sortedArray.push([i, jsObj[i]]);
    }

    // Run native sort function and returns sorted array.
    return sortedArray.sort();
}

function load_json_file(url) {
    let json_data = null;
    fetch(url).then(response => response.json()).then(json => json_data = json)
    return json_data;
}

function key_format(key, lang) {
    const keys = {
        'fr': {
            'joke': "Propulsé par du Propergol 🚀",
            'wd_no_dir': 'Pas de données',
            'chart_data_title': "Presence du Vent (%)",
            'average_short': '',
            'min_short': 'Mini',
            'max_short': 'Maxi',
            'AT': 'Temperature',
            'HWS': 'Vitesse du vent',
            'PRE': 'Pression Atmospherique',
            'request_head': 'Entête',
            'request_body': 'Corps',
            'more_info': "Plus d'Info",
            'from': 'Début',
            'to': 'Fin',
            'wind_rose': 'Rose des Vents',
            'details': 'Détails',
            'SSW': 'SSO',
            'SW': 'SO',
            'WSW': 'OSO',
            'W': 'O',
            'WNW': 'ONO',
            'NW': 'NO',
            'NNW': 'NNO',
            'summer': 'Été',
            'autumn': 'Automne',
            'winter': 'Hiver',
            'spring': 'Printemps',
            'key': 'Clé',
            'value': 'Valeur',
            'sol_date': 'Sol',
            'season': 'Saison',
            "First_UTC": 'Début (UTC)',
            'Last_UTC': 'Fin (UTC)',
            'valid': 'Validé',
            'sensor': 'Capteur',
            'mn': 'Valeur Minimum',
            'av': 'Valeur Moyenne',
            'mx': 'Valeur Maximum',
            'ct': "Nombre d'échantillons",
            'sector': 'Secteur',
            'wind_sectors': 'Secteurs de Vents',
            'compass_degrees': 'Angle de la Boussole',
            'compass_point': 'Direction de la Boussole',
        },
        'en': {
            'joke': "Powered by Rocket Fuel 🚀",
            'wd_no_dir': 'No Data',
            'chart_data_title': "Wind Presence (%)",
            'min_short': 'Lows',
            'max_short': 'Highs',
            'average_short': '',
            'AT': 'Temperature',
            'HWS': 'Wind Speed',
            'PRE': 'Atmospheric Pressure',
            'request_head': 'Head',
            'request_body': 'Body',
            'more_info': "More Info",
            'wind_rose': 'Wind Rose',
            'summer': 'Summer',
            'autumn': 'Autumn',
            'winter': 'Winter',
            'spring': 'Spring',
            'key': 'Key',
            'value': 'Value',
            'sol_date': 'Sol',
            'season': 'Season',
            "First_UTC": 'Start (UTC)',
            'Last_UTC': 'End (UTC)',
            'valid': 'Validated',
            'sensor': 'Sensor',
            'mn': 'Minimum Value',
            'av': 'Average Value',
            'mx': 'Maximum Value',
            'ct': "Sample Count",
            'compass_degrees': 'Compass Degrees',
            'compass_point': 'Compass Point',
            'compass_right': 'Compass Right',
            'compass_up': 'Compass Up',
            'sector': 'Sector',
            'wind_sectors': 'Wind Sectors',
        }
    }
    //console.log(keys)
    let value = keys[lang.toString()][key]
    if (value == null) {
        value = keys['en'][key]
        if (value == null) {
            return key
        }
    }
    return value
}

function en_date_nbr(date) {
    let utc_date = date.getDate()
    if (utc_date === 1 || utc_date === 21 || utc_date === 31)
        utc_date += 'st';
    else if (utc_date === 2 || utc_date === 22)
        utc_date += 'nd';
    else if (utc_date === 3 || utc_date === 23)
        utc_date += 'rd';
    else
        utc_date += 'th';
    return utc_date
}

function time_span(first_UTC, last_UTC, lang) {
    let out_str = ""
    if (lang === 'fr') {
        months = {
            0: 'Janvier',
            1: 'Fevrier',
            2: 'Mars',
            3: 'Avril',
            4: 'Mai',
            5: 'Juin',
            6: 'Juillet',
            7: 'Août',
            8: 'Septembre',
            9: 'Octobre',
            10: 'Novembre',
            11: 'Decembre'
        };
        if (last_UTC.getDate() - first_UTC.getDate() !== 0)
            out_str += first_UTC.getDate() + '-' + last_UTC.getDate() + ' '
        else
            out_str += first_UTC.getDate() + ' '

        if (last_UTC.getMonth() - first_UTC.getMonth() !== 0)
            out_str += months[first_UTC.getMonth()] + '-' + months[last_UTC.getMonth()] + ' '
        else
            out_str += months[first_UTC.getMonth()] + ' '

        if (last_UTC.getFullYear() - first_UTC.getFullYear() !== 0)
            out_str += first_UTC.getFullYear() + '-' + last_UTC.getFullYear()
        else
            out_str += first_UTC.getFullYear()
    } else {
        months = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        };
        if (last_UTC.getMonth() - first_UTC.getMonth() !== 0)
            out_str += months[first_UTC.getMonth()] + '-' + months[last_UTC.getMonth()] + ', '
        else
            out_str += months[first_UTC.getMonth()] + ', '

        if (last_UTC.getDate() - first_UTC.getDate() !== 0)
            out_str += en_date_nbr(first_UTC) + '-' + en_date_nbr(last_UTC) + ' '
        else
            out_str += en_date_nbr(first_UTC) + ' '

        if (last_UTC.getFullYear() - first_UTC.getFullYear() !== 0)
            out_str += first_UTC.getFullYear() + '-' + last_UTC.getFullYear()
        else
            out_str += first_UTC.getFullYear()
    }
    return out_str
}

function celsius_2_fahrenheit(celsius) {
    return (celsius * (9 / 5)) + 32
}

function mps_2_mph(mps) {
    return mps * 2.237
}

function mps_2_kph(mps) {
    return mps * 3.6
}

function pa_2_psi(pa) {
    return pa / 6895
}

function pa_2_mbar(pa) {
    return pa * (Math.pow(10, -2))
}

function pa_2_bar(pa) {
    return pa * (Math.pow(10, -5))
}