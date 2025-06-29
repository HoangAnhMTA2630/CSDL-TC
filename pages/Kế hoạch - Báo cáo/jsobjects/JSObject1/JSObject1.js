export default {
  transformToTree: () => {
    const rawData = Query1.data;
    const tree = [];

    rawData.forEach(item => {
      const loaiKey = String(item.loai_ke_hoach_id);
      const nam = item.nam;
      const quy = item.quy;
      const thang = item.thang;
      const tuan = item.tuan;
      const boKeHoachId = item.bo_ke_hoach_id;

      // --- 1. Cấp Loại kế hoạch ---
      // Value: LKH_loai_ke_hoach_id
      const loaiValue = `LKH_${loaiKey}`;
      let loaiNode = tree.find(node => node.value === loaiValue);
      if (!loaiNode) {
        loaiNode = {
          label: `📁 ${item.ten_loai_ke_hoach}`,
          value: loaiValue,
          children: []
        };
        tree.push(loaiNode);
      }

      // --- 2. Cấp Năm ---
      // Value: loaiKey_nam_FOLDER (để đảm bảo duy nhất cho folder Năm)
      const namFolderValue = `${loaiKey}_${nam}_FOLDER`;
      let namNode = loaiNode.children.find(c => c.value === namFolderValue);
      if (!namNode) {
        namNode = {
          label: `📁 Năm ${nam}`,
          value: namFolderValue,
          children: []
        };
        loaiNode.children.push(namNode);
      }

      if (!Array.isArray(namNode.children)) {
        namNode.children = [];
      }

      // --- 3. Xử lý các cấp độ thời gian và thêm kế hoạch ---
      // Value của tất cả các node kế hoạch cụ thể (node lá) sẽ chỉ là bo_ke_hoach_id
      const planValue = String(boKeHoachId); // Đảm bảo là string cho consistency

      if (item.ten_loai_thoi_gian === 'Năm') {
        namNode.children.push({
          label: `🗃️ ${item.ten_bo_ke_hoach}`,
          value: planValue // Chỉ là ID của bộ kế hoạch
        });
      } else if (item.ten_loai_thoi_gian === 'Quý') {
        const quyFolderValue = `${loaiKey}_${nam}_${quy}_FOLDER`;
        let quyNode = namNode.children.find(c => c.value === quyFolderValue);

        if (!quyNode) {
          quyNode = {
            label: `📁 Quý ${quy}`,
            value: quyFolderValue,
            children: []
          };
          namNode.children.push(quyNode);
        }

        if (!Array.isArray(quyNode.children)) {
          quyNode.children = [];
        }

        quyNode.children.push({
          label: `🗃️ ${item.ten_bo_ke_hoach}`,
          value: planValue // Chỉ là ID của bộ kế hoạch
        });

      } else if (item.ten_loai_thoi_gian === 'Tháng') {
        const quyFolderValue = `${loaiKey}_${nam}_${quy}_FOLDER`;
        let quyNode = namNode.children.find(c => c.value === quyFolderValue);

        if (!quyNode) {
          quyNode = {
            label: `📁 Quý ${quy}`,
            value: quyFolderValue,
            children: []
          };
          namNode.children.push(quyNode);
        }

        if (!Array.isArray(quyNode.children)) {
          quyNode.children = [];
        }

        const thangFolderValue = `${loaiKey}_${nam}_${quy}_${thang}_FOLDER`;
        let thangNode = quyNode.children.find(c => c.value === thangFolderValue);

        if (!thangNode) {
          thangNode = {
            label: `📁 Tháng ${thang}`,
            value: thangFolderValue,
            children: []
          };
          quyNode.children.push(thangNode);
        }

        if (!Array.isArray(thangNode.children)) {
          thangNode.children = [];
        }

        thangNode.children.push({
          label: `🗃️ ${item.ten_bo_ke_hoach}`,
          value: planValue // Chỉ là ID của bộ kế hoạch
        });

      } else if (item.ten_loai_thoi_gian === 'Tuần') {
        const quyFolderValue = `${loaiKey}_${nam}_${quy}_FOLDER`;
        let quyNode = namNode.children.find(c => c.value === quyFolderValue);

        if (!quyNode) {
          quyNode = {
            label: `📁 Quý ${quy}`,
            value: quyFolderValue,
            children: []
          };
          namNode.children.push(quyNode);
        }

        if (!Array.isArray(quyNode.children)) {
          quyNode.children = [];
        }

        const thangFolderValue = `${loaiKey}_${nam}_${quy}_${thang}_FOLDER`;
        let thangNode = quyNode.children.find(c => c.value === thangFolderValue);

        if (!thangNode) {
          thangNode = {
            label: `📁 Tháng ${thang}`,
            value: thangFolderValue,
            children: []
          };
          quyNode.children.push(thangNode);
        }

        if (!Array.isArray(thangNode.children)) {
          thangNode.children = [];
        }

        const tuanFolderValue = `${loaiKey}_${nam}_${quy}_${thang}_${tuan}_FOLDER`;
        let tuanNode = thangNode.children.find(c => c.value === tuanFolderValue);

        if (!tuanNode) {
          tuanNode = {
            label: `📁 Tuần ${tuan}`,
            value: tuanFolderValue,
            children: []
          };
          thangNode.children.push(tuanNode);
        }

        if (!Array.isArray(tuanNode.children)) {
          tuanNode.children = [];
        }

        tuanNode.children.push({
          label: `🗃️ ${item.ten_bo_ke_hoach}`,
          value: planValue // Chỉ là ID của bộ kế hoạch
        });
      }
    });

    // --- Hàm sắp xếp nodes ---
    function sortNodes(nodes) {
        nodes.forEach(node => {
            if (node.children && node.children.length > 0) {
                node.children.sort((a, b) => {
                    const aIsFolder = a.value.endsWith('_FOLDER');
                    const bIsFolder = b.value.endsWith('_FOLDER');

                    // A. Phân biệt kế hoạch năm và các folder
                    // Kế hoạch năm (type "Năm") có value chỉ là id (không có _FOLDER)
                    // và nằm trực tiếp dưới node Năm (có value kết thúc bằng _FOLDER)
                    // Kế hoạch khác (Quý, Tháng, Tuần) cũng có value là id nhưng nằm dưới folder khác
                    // Để ưu tiên kế hoạch năm lên đầu, ta cần kiểm tra nếu node cha của nó là node năm (chứa _FOLDER)
                    // và bản thân nó không phải là folder.
                    // Đây là phần hơi phức tạp nếu chỉ dựa vào value của node con.
                    // Một cách đơn giản hơn là gán một `type` riêng cho "Kế hoạch năm" ngay từ đầu.
                    // Tuy nhiên, với cấu trúc hiện tại, ta có thể dựa vào việc
                    // node không có suffix _FOLDER và node cha của nó là "Năm" (có _FOLDER).
                    // Vì hàm sortNodes là đệ quy, ta không có trực tiếp node cha ở đây.
                    // Do đó, chúng ta sẽ dựa vào pattern của value.
                    // Kế hoạch năm sẽ có value chỉ là ID (ví dụ "1"),
                    // các folder có "_FOLDER", và các kế hoạch quý/tháng/tuần cũng là ID.
                    // Để làm đúng, ta cần nhận biết "Kế hoạch năm" trong ngữ cảnh của node cha là "Năm".

                    // Giải pháp: Kế hoạch năm sẽ có value chỉ là ID (VD: "1", "7", "10"),
                    // còn các folder có "_FOLDER".
                    // Giờ ta cần ưu tiên các node con không phải folder, và value của nó là duy nhất.
                    // Nếu `a.value` và `b.value` đều là số (ID của bộ kế hoạch), thì ta không thể sắp xếp chúng
                    // dựa trên việc nó có phải là "kế hoạch năm" hay không.
                    // Vì tất cả các kế hoạch cụ thể (năm, quý, tháng, tuần) giờ đều có value là ID.

                    // Cần một cách để xác định loại kế hoạch (năm/quý/tháng/tuần) từ node lá.
                    // Nếu không có, thì chúng ta chỉ có thể sắp xếp:
                    // 1. Các node không phải folder (tức là các kế hoạch cụ thể)
                    // 2. Các node folder
                    // Và trong mỗi nhóm, sắp xếp theo label.

                    // Cân nhắc: liệu các value của bo_ke_hoach_id có trùng nhau giữa các loại kế hoạch không?
                    // Nếu id 1 có thể là của "Kế hoạch năm" và id 1 cũng có thể là của "Kế hoạch quý 1",
                    // thì việc chỉ dùng ID là value sẽ gây ra lỗi duplicate value.
                    // Giả định bo_ke_hoach_id là duy nhất trên toàn bộ tập dữ liệu,
                    // và không có kế hoạch nào có id trùng với id loại kế hoạch (LKH_1...).

                    // Nếu bạn *thực sự* muốn Kế hoạch năm lên đầu, rồi mới đến các folder Quý/Tháng/Tuần,
                    // thì value của Kế hoạch năm cần có một dấu hiệu riêng biệt, hoặc bạn phải truyền thêm thông tin
                    // cho hàm sortNodes để nó biết node cha là gì.
                    // Cách đơn giản nhất để thực hiện yêu cầu này là:
                    //   a) Kế hoạch năm: thêm hậu tố `_YEAR_PLAN` vào ID của nó.
                    //   b) Kế hoạch quý/tháng/tuần: thêm hậu tố `_OTHER_PLAN` vào ID của nó.

                    // **Sửa đổi để ưu tiên kế hoạch năm:**
                    // Thêm hậu tố đặc biệt cho kế hoạch năm: `boKeHoachId_YEAR_PLAN`
                    // Các kế hoạch khác: `boKeHoachId_PLAN` (hoặc không cần hậu tố nếu ID là đủ duy nhất)

                    // Quay lại logic sắp xếp:
                    const aIsYearPlanNode = (a.label.includes('năm') && !a.label.includes('quý') && !a.label.includes('tháng') && !a.label.includes('tuần') && !aIsFolder);
                    const bIsYearPlanNode = (b.label.includes('năm') && !b.label.includes('quý') && !b.label.includes('tháng') && !b.label.includes('tuần') && !bIsFolder);

                    if (aIsYearPlanNode && !bIsYearPlanNode) return -1;
                    if (!aIsYearPlanNode && bIsYearPlanNode) return 1;

                    // 1. Ưu tiên các Folder (Quý, Tháng, Tuần) sau kế hoạch năm
                    // Note: Nếu bạn muốn các kế hoạch năm *luôn luôn* nằm ở đầu cùng của năm
                    // và các folder Quý, Tháng, Tuần sau đó, thì đoạn logic này cần được tinh chỉnh.
                    // Với `value` chỉ là `id` cho các kế hoạch, ta không thể phân biệt trực tiếp
                    // Kế hoạch năm với Kế hoạch quý/tháng/tuần *bằng value*.
                    // Ta phải dựa vào `label` (không phải lý tưởng) hoặc thêm lại thông tin vào `value`.

                    // Giữ lại logic sắp xếp ưu tiên folder theo cấp độ và số thứ tự
                    // và kế hoạch năm ở đầu (như đã sửa ở trên)
                    // và các kế hoạch quý/tháng/tuần theo label.

                    // Sắp xếp các folder theo cấp độ (Quý, Tháng, Tuần)
                    if (aIsFolder && bIsFolder) {
                        const aValueParts = a.value.split('_');
                        const bValueParts = b.value.split('_');
                        // Độ sâu của folder (số lượng phần tử trước _FOLDER)
                        const aDepth = aValueParts.indexOf('FOLDER');
                        const bDepth = bValueParts.indexOf('FOLDER');

                        if (aDepth < bDepth) return -1; // Quý (depth 3) trước Tháng (depth 4)
                        if (aDepth > bDepth) return 1;

                        // Nếu cùng cấp, sắp xếp theo số (Quý 1, Quý 2)
                        const aValNum = parseInt(a.label.match(/\d+/)?.[0]);
                        const bValNum = parseInt(b.label.match(/\d+/)?.[0]);
                        if (!isNaN(aValNum) && !isNaN(bValNum)) {
                            return aValNum - bValNum;
                        }
                    }

                    // Nếu không phải trường hợp đặc biệt trên, sắp xếp theo label (bảng chữ cái)
                    return a.label.localeCompare(b.label);
                });
                sortNodes(node.children); // Đệ quy sắp xếp các cấp con
            }
        });
    }

    sortNodes(tree);

    return tree;
  }
};
// export default {
  // transformToTree: () => {
    // const rawData = Query1.data;
    // const tree = [];
// 
    // rawData.forEach(item => {
      // const loaiKey = String(item.loai_ke_hoach_id);
      // const nam = item.nam;
      // const quy = item.quy;
      // const thang = item.thang;
      // const tuan = item.tuan;
      // const boKeHoachId = item.bo_ke_hoach_id;
// 
      // // --- 1. Cấp Loại kế hoạch ---
      // let loaiNode = tree.find(node => node.value === loaiKey);
      // if (!loaiNode) {
        // loaiNode = {
          // label: `📁 ${item.ten_loai_ke_hoach}`,
          // value: loaiKey,
          // children: []
        // };
        // tree.push(loaiNode);
      // }
// 
      // // --- 2. Cấp Năm ---
      // const namFolderValue = `${loaiKey}_${nam}_FOLDER`;
      // let namNode = loaiNode.children.find(c => c.value === namFolderValue);
      // if (!namNode) {
        // namNode = {
          // label: `📁 Năm ${nam}`,
          // value: namFolderValue,
          // children: []
        // };
        // loaiNode.children.push(namNode);
      // }
// 
      // if (!Array.isArray(namNode.children)) {
        // namNode.children = [];
      // }
// 
      // // --- 3. Xử lý các cấp độ thời gian và thêm kế hoạch ---
      // if (item.ten_loai_thoi_gian === 'Năm') {
        // namNode.children.push({
          // label: item.ten_bo_ke_hoach,
          // value: `${loaiKey}_${nam}_${boKeHoachId}_PLAN`
        // });
      // } else if (item.ten_loai_thoi_gian === 'Quý') {
        // const quyFolderValue = `${loaiKey}_${nam}_${quy}_FOLDER`;
        // let quyNode = namNode.children.find(c => c.value === quyFolderValue);
// 
        // if (!quyNode) {
          // quyNode = {
            // label: `📁 Quý ${quy}`,
            // value: quyFolderValue,
            // children: []
          // };
          // namNode.children.push(quyNode);
        // }
// 
        // if (!Array.isArray(quyNode.children)) {
          // quyNode.children = [];
        // }
// 
        // quyNode.children.push({
          // label: item.ten_bo_ke_hoach,
          // value: `${loaiKey}_${nam}_${quy}_${boKeHoachId}_PLAN`
        // });
// 
      // } else if (item.ten_loai_thoi_gian === 'Tháng') {
        // const quyFolderValue = `${loaiKey}_${nam}_${quy}_FOLDER`;
        // let quyNode = namNode.children.find(c => c.value === quyFolderValue);
// 
        // if (!quyNode) {
          // quyNode = {
            // label: `📁 Quý ${quy}`,
            // value: quyFolderValue,
            // children: []
          // };
          // namNode.children.push(quyNode);
        // }
// 
        // if (!Array.isArray(quyNode.children)) {
          // quyNode.children = [];
        // }
// 
        // const thangFolderValue = `${loaiKey}_${nam}_${quy}_${thang}_FOLDER`;
        // let thangNode = quyNode.children.find(c => c.value === thangFolderValue);
// 
        // if (!thangNode) {
          // thangNode = {
            // label: `📁 Tháng ${thang}`,
            // value: thangFolderValue,
            // children: []
          // };
          // quyNode.children.push(thangNode);
        // }
// 
        // if (!Array.isArray(thangNode.children)) {
          // thangNode.children = [];
        // }
// 
        // thangNode.children.push({
          // label: item.ten_bo_ke_hoach,
          // value: `${loaiKey}_${nam}_${quy}_${thang}_${boKeHoachId}_PLAN`
        // });
// 
      // } else if (item.ten_loai_thoi_gian === 'Tuần') {
        // const quyFolderValue = `${loaiKey}_${nam}_${quy}_FOLDER`;
        // let quyNode = namNode.children.find(c => c.value === quyFolderValue);
// 
        // if (!quyNode) {
          // quyNode = {
            // label: `📁 Quý ${quy}`,
            // value: quyFolderValue,
            // children: []
          // };
          // namNode.children.push(quyNode);
        // }
// 
        // if (!Array.isArray(quyNode.children)) {
          // quyNode.children = [];
        // }
// 
        // const thangFolderValue = `${loaiKey}_${nam}_${quy}_${thang}_FOLDER`;
        // let thangNode = quyNode.children.find(c => c.value === thangFolderValue);
// 
        // if (!thangNode) {
          // thangNode = {
            // label: `📁 Tháng ${thang}`,
            // value: thangFolderValue,
            // children: []
          // };
          // quyNode.children.push(thangNode);
        // }
// 
        // if (!Array.isArray(thangNode.children)) {
          // thangNode.children = [];
        // }
// 
        // const tuanFolderValue = `${loaiKey}_${nam}_${quy}_${thang}_${tuan}_FOLDER`;
        // let tuanNode = thangNode.children.find(c => c.value === tuanFolderValue);
// 
        // if (!tuanNode) {
          // tuanNode = {
            // label: `📁 Tuần ${tuan}`,
            // value: tuanFolderValue,
            // children: []
          // };
          // thangNode.children.push(tuanNode);
        // }
// 
        // if (!Array.isArray(tuanNode.children)) {
          // tuanNode.children = [];
        // }
// 
        // tuanNode.children.push({
          // label: item.ten_bo_ke_hoach,
          // value: `${loaiKey}_${nam}_${quy}_${thang}_${tuan}_${boKeHoachId}_PLAN`
        // });
      // }
    // });
// 
    // // --- Hàm sắp xếp nodes ---
    // function sortNodes(nodes) {
        // nodes.forEach(node => {
            // if (node.children && node.children.length > 0) {
                // node.children.sort((a, b) => {
                    // const aIsPlan = a.value.endsWith('_PLAN');
                    // const bIsPlan = b.value.endsWith('_PLAN');
// 
                    // const aIsFolder = a.value.endsWith('_FOLDER');
                    // const bIsFolder = b.value.endsWith('_FOLDER');
// 
                    // // 1. Ưu tiên kế hoạch năm lên đầu
                    // // Kế hoạch năm có value dạng `..._nam_boKeHoachId_PLAN`
                    // // Các kế hoạch quý/tháng/tuần có value dạng `..._quy_boKeHoachId_PLAN`, `..._thang_boKeHoachId_PLAN`, `..._tuan_boKeHoachId_PLAN`
                    // // Chúng ta cần một cách để nhận biết kế hoạch năm.
                    // // Cách đơn giản nhất là dựa vào độ dài value hoặc số lượng dấu gạch dưới,
                    // // hoặc chính xác hơn là kiểm tra hậu tố và sự hiện diện của quy/thang/tuan trong value.
                    // // Một cách khác là kiểm tra xem nó có phải là con trực tiếp của node Năm hay không.
                    // // Hiện tại, chúng ta biết rằng chỉ có Kế hoạch năm được thêm trực tiếp vào namNode.children
                    // // mà không thông qua quyNode, thangNode, tuanNode.
                    // // Vậy nên, ta có thể phân biệt kế hoạch năm bằng cách kiểm tra value của nó chỉ chứa `nam_boKeHoachId_PLAN`.
                    // // Hoặc đơn giản hơn, nếu là PLAN và không phải là FOLDER,
                    // // và không có các dấu hiệu của quy/thang/tuan trong value (ví dụ: không có '_FOLDER' và không có '_PLAN' với 3 dấu gạch dưới trở lên sau phần năm)
// 
                    // const aIsYearPlan = aIsPlan && a.value.split('_').length === 3 + 1; // loaiKey_nam_boKeHoachId_PLAN
                    // const bIsYearPlan = bIsPlan && b.value.split('_').length === 3 + 1; // loaiKey_nam_boKeHoachId_PLAN
// 
                    // if (aIsYearPlan && !bIsYearPlan) return -1; // a là kế hoạch năm, b không phải -> a lên trước
                    // if (!aIsYearPlan && bIsYearPlan) return 1;  // b là kế hoạch năm, a không phải -> b lên trước
// 
// 
                    // // 2. Tiếp theo là các folder (Quý, Tháng, Tuần)
                    // if (aIsFolder && !bIsFolder) return -1; // A là folder, B không -> A lên trước
                    // if (!aIsFolder && bIsFolder) return 1;  // B là folder, A không -> B lên trước
// 
                    // // Nếu cả hai đều là folder hoặc cả hai đều là plan (không phải year plan)
                    // // Sắp xếp theo số (Quý 1, Quý 2; Tháng 1, Tháng 2; Tuần 1, Tuần 2)
                    // if (aIsFolder && bIsFolder) {
                        // const aLevel = a.value.split('_').filter(s => s === 'FOLDER').length;
                        // const bLevel = b.value.split('_').filter(s => s === 'FOLDER').length;
// 
                        // // Ưu tiên Quý (ít dấu gạch dưới hơn) -> Tháng -> Tuần
                        // if (aLevel < bLevel) return -1;
                        // if (aLevel > bLevel) return 1;
// 
                        // // Nếu cùng cấp (cùng số dấu gạch dưới_FOLDER), sắp xếp theo số thứ tự
                        // const aValNum = parseInt(a.label.match(/\d+/)?.[0]);
                        // const bValNum = parseInt(b.label.match(/\d+/)?.[0]);
                        // if (!isNaN(aValNum) && !isNaN(bValNum)) {
                            // return aValNum - bValNum;
                        // }
                    // }
// 
                    // // Nếu cả hai đều là plan (không phải year plan), hoặc không phải folder
                    // // Sắp xếp theo label (theo bảng chữ cái)
                    // return a.label.localeCompare(b.label);
                // });
                // sortNodes(node.children); // Đệ quy sắp xếp các cấp con
            // }
        // });
    // }
// 
    // sortNodes(tree);
// 
    // return tree;
  // }
// };
// 
