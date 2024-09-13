function downloadSignaturesAndDelete() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sheet2');
  if (!sheet) {
    Logger.log('工作表名稱不正確，請確認工作表名稱。');
    return;
  }
  
  var range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2); // 假設簽名網址在B列，名字在A列
  var data = range.getValues();
  var filesToDelete = []; // 存放要刪除的檔案ID

  for (var i = 0; i < data.length; i++) {
    var name = data[i][0]; // 名字在A列
    var url = data[i][1]; // 網址在B列
    if (url) {
      try {
        var response = UrlFetchApp.fetch(url);
        
        if (response.getResponseCode() == 200) {
          var blob = response.getBlob();
          var fileName = name + '_簽名.png';
          var file = DriveApp.createFile(blob).setName(fileName);
          Logger.log('Downloaded: ' + fileName);
          
          // 將檔案ID存入陣列，以便後續刪除
          filesToDelete.push(file.getId());

          // 設置文件為公開
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          
          // 將圖片插入到C欄儲存格內
          var imageUrl = 'https://drive.google.com/uc?export=view&id=' + file.getId();
          sheet.getRange(i + 2, 3).setFormula('=IMAGE("' + imageUrl + '")');
          
        } else {
          Logger.log('Failed to download: ' + url);
        }
      } catch (e) {
        Logger.log('Error: ' + e.message);
      }
    }
  }

  // 刪除所有已下載的檔案
  for (var j = 0; j < filesToDelete.length; j++) {
    try {
      var file = DriveApp.getFileById(filesToDelete[j]);
      file.setTrashed(true); // 將檔案移至垃圾桶
      Logger.log('Deleted: ' + file.getName());
    } catch (e) {
      Logger.log('Error deleting file: ' + e.message);
    }
  }
}
