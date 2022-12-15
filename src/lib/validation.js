const validator = {
    required: function (word) { return word == "" ? "field required" : ""; },
    min: function (word, length) {
        return word.length > length ? "" : `word to short, minimum ${length}`
    },
    max: function (word, length) {
        return word.length < length ? "" : `word to long, maximum ${length}`
    },
    alpha: function (word) {
        return (new RegExp(/^[A-Za-z]+$/).test(word)) ? "" : 'only alphabet'
    },
    alpha_space: function (word) {

        return (new RegExp(/^[A-Za-z\s]+$/).test(word))
            ? ""
            : 'only alphabet and space only'
    },
    email: function (word) {
        return (new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(word))
            ? ""
            : 'please provide valid email'
    }
};

function validate(data, rules) {
    const _keyRules = Object.keys(rules);

    const _keyFormData = Object.keys(data);

    const _error = [];

    for (var x = 0; x < _keyRules.length; x++) {

        const _formatRules = rules[_keyRules[x]].split("|")

        if (_keyFormData.find(formKey => formKey == _keyRules[x])) {

            var _result = validating(_formatRules, data[_keyRules[x]])

            if (_result) {
                const _objectRule = {}

                _objectRule[_keyRules[x]] = _result

                _error.push(_objectRule)
            }

        } else {

            if ((_formatRules.find(rule => rule == "optional"))) {
                continue
            }
            const _object = {};
            _object[_keyRules[x]] = `field ${_keyRules[x]} not found`;
            _error.push(_object)
        }
    }

    return _error;

}

function validating(rules, word) {

    var _errors = ""

    for (var y = 0; y < rules.length; y++) {
        const _nameRule = rules[y].split(":");

        if (typeof validator[_nameRule[0]] == 'undefined') continue

        if (_nameRule.length == 1) {
            if (_nameRule[0] == 'optional') continue;

            var _result = validator[_nameRule[0]](word)

            if (!!_result) {
                _errors = _result; break
            }

        } else {
            _result = validator[_nameRule[0]](word, _nameRule[1])

            if (!!_result) {

                _errors = _result; break
            }
        }
    }
    return _errors;
}

export default {
    sanitize(data, rules) {

        const _resultFromValidation = validate(data, rules);

        const _resultError = {};

        if (_resultFromValidation.length) {

            _resultFromValidation.forEach(el => {

                const _key = Object.keys(el)

                _resultError[_key] = el[_key]
            })
        }

        return _resultError;

    }
}