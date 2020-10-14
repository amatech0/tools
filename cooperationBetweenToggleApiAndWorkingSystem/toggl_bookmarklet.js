javascript: (
    function () {
        var toggl_api = "";
        var toggl_email = "";
        var workspace_id = "";
        var startdate = "";
        var enddate = "";
        var h = "";
        var m = "";

        //prjと工数入力先の対応
        var UserInquiry = "";
        var UserSupport = "";
        var BugDevelopment = "";
        var BugEvalution = "";
        var FunctionDevelopment = "";
        var FunctionEvalution = "";
        var MTG = "";
        var MTG_Review = "";
        var Others = "";
        var Others_ForProduct = "";
        var Others_ForShipment = "";
        var Others_ForManagement = "";

        function getDay() {
            var targetmonth = document.getElementsByClassName("kikan_name")[0].children[0].nextSibling.textContent;
            var int_data = targetmonth.replace(/[^0-9]/g, '');
            var year = int_data.substr(0, 4);
            var month = int_data.substr(4, 2);
            var Sdate = new Date(year, month, 1);
            startdate = Sdate.getFullYear() + "-" + Sdate.getMonth() + "-" + Sdate.getDate();
            var Edate = new Date(year, month, 0);
            enddate = Edate.getFullYear() + "-" + (Edate.getMonth() + 1) + "-" + Edate.getDate();
        }

        function getToggle() {
            var apiurl = "https://toggl.com/reports/api/v2/details" + setPram(toggl_email, workspace_id, startdate, enddate);
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var data = this.response;
                checkData(data);
            };
            xhr.responseType = 'json';
            xhr.open('GET', apiurl, true);
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(toggl_api + ':api_token'));
            xhr.send();
        }

        function setPram(toggl_email, workspace_id, startdate, enddate) {
            return "?workspace_id=" + workspace_id + "&user_agent=" + toggl_email + "&since=" + startdate + "&until=" + enddate + "&order_desc=off";
        }

        function computeDuration(dur) {
            h = String(Math.floor(dur / 3600000) + 100).substring(1);
            m = String(Math.floor((dur - h * 3600000) / 60000) + 100).substring(1);
            var s = String(Math.round((dur - h * 3600000 - m * 60000) / 1000) + 100).substring(1);
            if (s != 0) {
                m = parseInt(m) + 1;
            }
        }

        function checkData(jsondata) {
            var DataList = jsondata.data;
            if (DataList.length == 0) {
                return;
            }
            var resultList = [];
            var nowDate = "";
            DataList.forEach(function (targetData, index) {
                var targetDate = new Date(targetData.start);
                var ShapingtargetDate = targetDate.getFullYear() + "-" + (targetDate.getMonth() + 1) + "-" + targetDate.getDate();
                var ShapingNowDate = "";
                if (nowDate != "") {
                    ShapingNowDate = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate();
                }
                if (ShapingNowDate == "" || ShapingtargetDate == ShapingNowDate) {

                } else {
                    if (Object.keys(resultList).length != 0) {
                        inputToProject(resultList, nowDate, ShapingNowDate);
                        resultList = [];
                    }
                }
                nowDate = targetDate;
                var targetDur = targetData.dur;
                var targetPrj = targetData.project;
                var targetTags = targetData.tags;
                var targetWorkingSystem = "";
                if (targetPrj != null) {
                    switch (targetPrj.toString()) {
                        case "UserInquiry":
                            targetWorkingSystem = UserInquiry;
                            break;
                        case "UserSupport":
                            targetWorkingSystem = UserSupport;
                            break;
                        case "BugDevelopment":
                            targetWorkingSystem = BugDevelopment;
                            break;
                        case "BugEvaluation":
                            targetWorkingSystem = BugEvalution;
                            break;
                        case "FunctionDevelopment":
                            targetWorkingSystem = FunctionDevelopment;
                            break;
                        case "FunctionEvaluation":
                            targetWorkingSystem = FunctionEvalution;
                            break;
                        case "MTG":
                            if (targetTags.length == 0) {
                                targetWorkingSystem = MTG;
                            } else {
                                targetTags.forEach(function (targetTag) {
                                    switch (targetTag) {
                                        case "Review":
                                            targetWorkingSystem = MTG_Review;
                                            break;
                                    }
                                });
                            }
                            break;
                        case "Others":
                            if (targetTags.length == 0) {
                                targetWorkingSystem = Others;
                            } else {
                                targetTags.forEach(function (targetTag) {
                                    switch (targetTag) {
                                        case "ForProduct":
                                            targetWorkingSystem = Others_ForProduct;
                                            break;
                                        case "ForShipment":
                                            targetWorkingSystem = Others_ForShipment;
                                            break;
                                        case "ForManagement":
                                            targetWorkingSystem = Others_ForManagement;
                                            break;
                                    }
                                });
                            }
                            break;
                    }
                }
                if (targetWorkingSystem == "") {

                } else {
                    if (resultList[targetWorkingSystem]) {
                        resultList[targetWorkingSystem] = parseInt(resultList[targetWorkingSystem]) + parseInt(targetDur);
                    } else {
                        resultList[targetWorkingSystem] = targetDur;
                    }
                }
                if (index == DataList.length - 1) {
                    if (Object.keys(resultList).length != 0) {
                        inputToProject(resultList, nowDate);
                        resultList = [];
                    }
                }
            });
        }

        function inputToProject(resultList, nowDate, ShapingNowDate) {
            try {
                var count = nowDate.getDate();
                if (count >= 23) {
                    count = count + 2;
                } else if (count >= 12) {
                    count = count + 1;
                }
                var tablebody = document.getElementById("apploveID").children[0].children[count].cells[5].children[0].children[0];
                Object.keys(resultList).forEach(function (key) {
                    for (var i = 0, rowLen = tablebody.rows.length; i < rowLen; i++) {
                        var joinPrj = tablebody.children[i].cells[0].textContent + "	" + tablebody.children[i].cells[1].textContent;
                        if (joinPrj == key) {
                            computeDuration(resultList[key]);
                            tablebody.children[i].cells[2].children[0].value = h;
                            tablebody.children[i].cells[2].children[1].value = m;
                            h = 0;
                            m = 0;
                        }
                    }
                });
            } catch (e) {
                console.log(ShapingNowDate + "は入力できません。データはありますが集計されません");
            }
        }

        getDay();
        getToggle();
    }
)();