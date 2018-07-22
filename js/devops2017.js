var session_table_D1 = {
    "09:00": ["2230"],
    "09:30": ["2232"],
    "09:40": ["2257"],
    "10:20": ["2234"],
    "10:30": ["2246"],
    "11:10": ["2235"],
    "11:20": ["2262"],
    "12:00": ["2238"],
    "13:30": ["2229", "2265"],
    "14:10": ["2241"],
    "14:20": ["2260", "2239"],
    "15:00": ["2244"],
    "15:10": ["2259", "2251"],
    "15:50": ["2247"],
    "16:00": ["2263", "2224"],
    "16:40": ["2250"],
    "16:50": ["2237", "2240"],
    "17:30": ["2253"]
}

var session_table_D2 = {
    "09:00": ["2269"],
    "09:30": ["2270"],
    "09:40": ["2243"],
    "10:20": ["2254"],
    "10:30": ["2228"],
    "11:10": ["2255"],
    "11:20": ["2249"],
    "12:00": ["2258"],
    "13:30": ["2248", "2226"],
    "14:10": ["2261"],
    "14:20": ["2231", "2227"],
    "15:00": ["2268"],
    "15:10": ["2242", "2225"],
    "15:50": ["2264"],
    "16:00": ["2252", "2245"],
    "16:40": ["2266"],
    "16:50": ["2256", "2236"],
    "17:15": ["2267"]
}


var devops2017 = new Vue({
    el: '#devops2017',
    data: {
        Session: {},
        session_table_D1: session_table_D1,
        session_table_D2: session_table_D2,
        Speaker: {},
        Sponsor: {},
        Modal_Speaker: {},
        Modal_Session: {},
        Modal_order: 0,
        Modal_type: 'china',
        Jobs: []
    },
    computed: {
        ModalData: function() {
            var Modal_ID = this.Modal_ID;
            return this.Speaker[Modal_ID] || {}
        },
        SpeakerFilter: function() {
            var speaker = this.Speaker;
            return {
                keynote: this.filter(speaker, 'session_type', 'keynote', true),
                session: this.filter(speaker, 'session_type', 'session', true),
                featured: this.filter(speaker, 'role', '關鍵講師', true).map(function(val, index) {
                    val.order_id = index;
                    return val;
                }),
                china: this.filter(speaker, 'tags', 'China', true).map(function(val, index) {
                    val.order_id = index;
                    return val;
                }),
                normal: this.filter(this.filter(speaker, 'role', '講師', true), 'tags', 'China', false).map(function(val, index) {
                    val.order_id = index;
                    return val;
                })
            }
        },
        JobFilter: function() {
            var Jobs = this.Jobs;
            var myfilter = function(value, boolean) {
                return $.grep(Jobs, function(obj) {
                    if (typeof obj['sponsor']['rank'] === 'object') {
                        return (!!~$.inArray(value, obj['sponsor']['rank']) == boolean) ? obj : null;
                    } else {
                        return ((obj['sponsor']['rank'] == value) == boolean) ? obj : null;
                    }
                });
            };
            return {
                Coorganizer: myfilter('天龍級', true),
                Diamond: myfilter('鑽石級', true),
                Platinum: myfilter('白金級', true),
                Gold: myfilter('黃金級', true),
                Silver: myfilter('銀級', true),
                Copper: myfilter('銅級', true),

            }
        }
    },
    methods: {
        filter: function(data, field, value, boolean) {
            return $.grep(data, function(obj) {
                if (typeof obj[field] === 'object') {
                    return (!!~$.inArray(value, obj[field]) == boolean) ? obj : null;
                } else {
                    return ((obj[field] == value) == boolean) ? obj : null;
                }
            });
        },
        showModal: function(speaker, index, speaker_type) {
            this.Modal_order = index;
            this.Modal_Speaker = speaker;
            this.Modal_type = speaker_type;
            $('a[href="#speakerModalAgenda"]').tab('show');
            $('#speaker_modal').modal('show');
        },
        // showModal2: function (session) {
        //     this.Modal_Session = session;
        //     if (!!session.speaker.length) {
        //         $('a[href="#sessionModalAgenda"]').tab('show');
        //         $('#sessionModal').modal('show');
        //     }
        // },
        showModal_agenda: function(session) {
            this.Modal_Session = session;
            $('a[href="#speakerModalAgenda"]').tab('show');
            $('#agenda_modal').modal('show');
        },
        arcToSpan: function(str) {
            return str.replace(/\(/igm, '<span>(').replace(/\)/igm, ')</span>');
        },
        modal_next: function() {
            var speaker_china = this.SpeakerFilter.china;
            var speaker_normal = this.SpeakerFilter.normal;
            // if (this.Modal_order == speaker_china.length - 1) {
            //     $('button.modal_pre').hide();
            // }
            this.Modal_order = this.Modal_order + 1;
            this.Modal_Speaker = this.SpeakerFilter[this.Modal_type][this.Modal_order];
            devops2017.$nextTick(function() {
                if ($('#speaker_modal').hasScrollBar()) {
                    $('#speaker_modal').css('padding-right', '0px');
                } else {
                    $('#speaker_modal').css('padding-right', '15px');
                }
            });
        },
        modal_pre: function() {
            // if (this.Modal_order == 0) {
            //     $('.modal_next').hide();
            // }
            this.Modal_order = this.Modal_order - 1;
            this.Modal_Speaker = this.SpeakerFilter[this.Modal_type][this.Modal_order];
            devops2017.$nextTick(function() {
                if ($('#speaker_modal').hasScrollBar()) {
                    $('#speaker_modal').css('padding-right', '0px');
                } else {
                    $('#speaker_modal').css('padding-right', '15px');
                }
            });
        },
        time: function(date) {
            var leftPadZero = function(str, n) {
                str = ('' + str);
                return Array(n - str.length + 1).join('0') + str;
            }
            if (!!date) {
                return leftPadZero(date.getHours(), 2) + ':' + leftPadZero(date.getMinutes(), 2);
            }
            return '';
        }
    },
    filters: {
        time: function(date) {
            var leftPadZero = function(str, n) {
                str = ('' + str);
                return Array(n - str.length + 1).join('0') + str;
            }
            if (!!date) {
                return leftPadZero(date.getHours(), 2) + ':' + leftPadZero(date.getMinutes(), 2);
            }
            return '';
        }
    },
    beforeCreate: function() {
        $.when(
            confapi.getSessionWithSpeaker(),
            confapi.getSpeakerWithSession(),
            confapi.getSponsor()
        ).then(function(session, speaker, sponsor) {
            session['0'] = {};

            devops2017.Session = session;
            devops2017.Speaker = speaker;
            devops2017.Sponsor = sponsor;
            return sponsor;
        }).then(function(sponsor) {
            // jobs.html
            var deferred = $.Deferred();
            $.getJSON('https://confapi.ithome.com.tw/api/v1.3/job-list?conf_id=2191&callback=?').then(function(jobs) {
                devops2017.Jobs = $.map(jobs, function(jobRowData) {
                    for (var i = 0; i < sponsor.length; i++) {
                        sponsor[i].title = sponsor[i].title.replace(/&amp;/igm, '&');
                        if (jobRowData.sponsor_id == sponsor[i].vendor_id) {
                            jobRowData.sponsor = sponsor[i];
                            break;
                        }
                    }
                    if (!!jobRowData.sponsor) {
                        return jobRowData;
                    }
                });
                deferred.resolve('');
            }.bind(this));
            return deferred.promise();
        }).then(function(sponsor) {
            devops2017.$nextTick(function() {
                $('body').addClass('is-active');
                setTimeout(function() {
                    $('#loading').remove();
                }, 500);
                init();
            });
        });
    }
});