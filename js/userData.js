function userList() {
    var user_data = [];
  
    for (var i = 0; i < list.length; i++) {
        var entry = list[i];
        
        var checkVerify = false;
        var verifier = "";
        if (entry.author.split("[").length != 2) {
            verifier = entry.author;
        } else { 
            verifier = entry.author.split("[")[1].replace("]", "");
        }
        for (var b = 0 ; b < user_data.length ; b++) {
            if (user_data[b].name.toUpperCase() == verifier.toUpperCase()) {
                checkVerify = true;
            }
        }
    
        var p = roundNumber(getUserPoint(i+1, 100, entry.percentToQualify, "144hz") * 1, 3);
        if (checkVerify == true) {
            for (var b = 0 ; b < user_data.length ; b++) {
                var user_name = user_data[b].name.toUpperCase(); var data_name = verifier.toUpperCase();
                if (user_name == data_name) {
                    user_data[b].point = user_data[b].point + p;
                    user_data[b].verified.push(i+1);
                }
            }
        } else {
            var prog = [];
            var verified = []; verified.push(i+1)

            user_data.push({name : verifier, highest : "null", progress : prog, point : p, verified : verified});
        }
        
        for (var a = 0 ; a < entry.vids.length ; a++) {
            var entry2 = entry.vids[a];
            var isLoot = false;
            for (var b = 0 ; b < user_data.length ; b++) {
                if (user_data[b].name.toUpperCase() == entry2.user.toUpperCase()) {
                    isLoot = true;
                }
            }
            var p = getUserPoint(i+1, entry2.percent, entry.percentToQualify, entry2.hz);
            if (isLoot == true) {
                for (var b = 0 ; b < user_data.length ; b++) {
                    var user_name = user_data[b].name.toUpperCase(); var data_name = entry2.user.toUpperCase();
                    if (user_name == data_name) {
                        user_data[b].point = user_data[b].point + p;
                        
                        if (user_data[b].highest == "null" && parseInt(entry2.percent) == 100) {
                            user_data[b].highest = entry.name; 
                        }
                        user_data[b].progress.push({map : entry.name.toString(), progress : entry2.percent.toString(), link : entry2.link, score : roundNumber(p,3), rank : i+1, hz : (entry2.hz != null ? entry2.hz : "144hz")});
                    }
                }
            } else {
                var map = entry.name.toString();
                if (parseInt(entry2.percent) != 100) {
                    map = "null";
                }

                var prog = [];
                prog.push({map : entry.name.toString(), progress : entry2.percent.toString(), link : entry2.link, score : roundNumber(p,3), rank : i+1, hz : (entry2.hz != null ? entry2.hz : "144hz")});

                user_data.push({name : entry2.user, highest : map, progress : prog, point : p, verified : []});
            }
        }
    }
  
    var sortingField = "point"
    user_data.sort(function(a, b) {
    return b[sortingField] - a[sortingField];
    });
  
    for (var i = 0 ; i < user_data.length ; i++) {
        user_data[i].point = roundNumber(user_data[i].point, 3);
        user_data[i].progress.sort(function(a, b) {
            return b["score"] - a["score"];
        });
    }
    return user_data;
}

function getUserData(user) {
    var user_data = userList();
    var u = user_data[user];
    if (!u) return;

    var progresses = "<ol>";
    var clears = 0;

    // Verified clears
    for (var i = 0; i < u.verified.length; i++) {
        var rankIndex = u.verified[i] - 1;
        if (!list[rankIndex]) continue;
        clears++;
        progresses +=
            "<li>" +
            list[rankIndex].name +
            " Verified (#" +
            (rankIndex + 1) +
            " / UP: " +
            roundNumber(
                getUserPoint(
                    rankIndex + 1,
                    100,
                    list[rankIndex].percentToQualify,
                    "144hz"
                ) * 1,
                3
            ) +
            ")</li>";
    }

    // Progress records
    for (var j = 0; j < u.progress.length; j++) {
        var p = u.progress[j];
        progresses +=
            '<li><a href="' +
            p.link +
            '" target="blank_">' +
            p.map +
            " " +
            p.progress +
            "% (#" +
            p.rank +
            " / UP: " +
            p.score +
            (parseInt(p.hz.replace("hz", "")) >= 120 ? "" : " / " + p.hz) +
            ")</a></li>";

        if (p.progress == 100) {
            clears++;
        }
    }
    progresses += "</ol>";

    var container = document.getElementById("user-detail");
    if (!container) return;

    container.innerHTML =
        '<div class="adl-user-detail-header">' +
        "<h2>#" +
        (user + 1) +
        " : " +
        u.name +
        "</h2>" +
        "<p><strong>Score:</strong> " +
        u.point +
        "</p>" +
        "<p><strong>Best Record:</strong> " +
        u.highest +
        "</p>" +
        "<p><strong>Completed Levels:</strong> " +
        clears +
        " level(s)</p>" +
        "</div>" +
        '<div class="adl-user-detail-progress">' +
        "<h3>Record List</h3>" +
        progresses +
        "</div>";
}
