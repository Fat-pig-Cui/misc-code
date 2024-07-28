function taikai(contestId = "1001") {
    if (!contestId) {
        contestId = prompt("Please Enter a contest ID.");
    }
    if (!contestId) {
        return;
    }
    function download(data, fileName) {
        let a = document.createElement("a");
        a.href = URL.createObjectURL(
            new Blob([JSON.stringify(data, null, "  ")],
                {type: "text/plain"}));
        a.download = fileName;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    function sleep(msec) {
        return new Promise(function(resolve) {setTimeout(function() {resolve();}, msec);});
    }
    function getContestDetail(contestId, uniqueId) {
        app.NetAgent.sendReq2Lobby(
            "Lobby",
            "enterCustomizedContest",
            {unique_id:uniqueId},
            function(error, contestDetail) {
                download(contestDetail, "mahjongsoul_contest_" + contestId + "_detail.json");
            });
    }
    async function getContestRecords(contestId, uniqueId) {
        let uuidArray = new Array();
        let loopEndFlag = false;
        for (let i = 20;; i += 20) {
            app.NetAgent.sendReq2Lobby(
                "Lobby",
                "fetchCustomizedContestGameRecords",
                {unique_id:uniqueId, last_index:i},
                function(error, contestRecords) {
                    if (contestRecords.record_list.length == 0) {
                        loopEndFlag = true;
                        return;
                    }
                    for (const record of contestRecords.record_list) {
                        uuidArray.push(record.uuid);
                        console.log(i + "Downloading");
                    }
                });
            if (loopEndFlag) {
                break;
            }
            await sleep(1000);
        }
        download(uuidArray, "mahjongsoul_contest_" + contestId + "_uuid_list.json");
    }
    app.NetAgent.sendReq2Lobby(
        "Lobby",
        "fetchCustomizedContestByContestId",
        {contest_id:contestId},
        function(error, contestInfo) {
            uniqueId = contestInfo.contest_info.unique_id;
            getContestDetail(contestId, uniqueId);
            getContestRecords(contestId, uniqueId);
        });
}
taikai()