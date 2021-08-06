
const validateModel = (obj, status=400) => {
    return (req, res, next) => {
        let errors = {};
        Object.keys(obj).forEach((field) => {
            let toPush = [];
            let objField = obj[field];
            Object.keys(objField).forEach(item => {
                if (item === 'required') {
                    if (!req.body[field]) {
                        toPush.push(objField[item]);
                    }
                }
                if (req.body[field] && item === 'isEmail') {
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!re.test(String(req.body[field]).toLowerCase())) {
                        toPush.push(objField[item]);
                    }
                }
                if (req.body[field] && item === 'isString') {
                    if (typeof req.body[field] !== 'string') {
                        toPush.push(objField[item]);
                    }
                }
                if (req.body[field] && item.includes('min')) {
                    if (req.body[field].toString().length < parseInt(item.split("-")[1])) {
                        toPush.push(objField[item]);
                    }
                }
                if (req.body[field] && item.includes('max')) {
                    if (req.body[field].toString().length > parseInt(item.split("-")[1])) {
                        toPush.push(objField[item]);
                    }
                }
                if (req.body[field] && item.includes('contains')) {
                    const reqItem = req.body[field].toString();
                    if (!reqItem.includes(item.split("-")[1])) {
                        toPush.push(objField[item]);
                    }
                }
                if (req.body[field] && item === 'isArray') {
                    if (!Array.isArray(req.body[field])) {
                        toPush.push(objField[item]);
                    }
                }
                if (req.body[field] && item === 'isObject') {
                    if (typeof req.body[field] !== 'object') {
                        toPush.push(objField[item]);
                    }
                }
                if (req.body[field] && item === 'isDate') {
                    if (isNaN(Date.parse(req.body[field]))) {
                        toPush.push(objField[item]);
                    }
                }
                if (req.body[field] && item.includes('equals')) {
                    const reqItem = req.body[field].toString();
                    if (reqItem !== (item.split("-")[1]).toString()) {
                        toPush.push(objField[item]);
                    }
                }
                if (req.body[field] && item.includes('isInt')) {
                    if (typeof req.body[field] !== 'number') {
                        toPush.push(objField[item]);
                    }
                }
                if (req.body[field] && item.includes('isUrl')) {
                    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
                        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
                    if(!pattern.test(req.body[field])){
                        toPush.push(objField[item]);
                    }
                }
            })
            if (toPush.length > 0) {
                errors[field] = toPush
            }
        })

        if (Object.keys(errors).length > 0) {
            res.status(status).json(errors);
        } else {
            next();
        }
    }
}



module.exports = { validateModel };