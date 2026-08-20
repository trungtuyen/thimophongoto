const fs = require('fs');

const rawData = `
Tình huống 1: Người đi bộ sau xe tải
Dấu hiệu gián tiếp: Xe tải lớn phía trước che khuất hoàn toàn tầm nhìn bên phải
Dấu hiệu trực tiếp: Người đi bộ bất ngờ bước ra từ sau xe tải
Gợi ý xử lý: Chủ động rà phanh trước khi vượt qua điểm khuất, hạ tốc độ sâu, giữ khoảng cách an toàn và ưu tiên nhường đường
Tình huống 2: Người đi bộ qua dải phân cách
Dấu hiệu gián tiếp: Khu vực có dải phân cách, thường có người băng qua không đúng nơi
Dấu hiệu trực tiếp: Người đi bộ bước xuống phần đường xe chạy
Gợi ý xử lý: Giảm tốc từ sớm, quan sát hướng di chuyển của người đi bộ và dừng lại nếu họ tiếp tục sang đường
Tình huống 3: Xe buýt dừng phía trước
Dấu hiệu gián tiếp: Xe buýt đang dừng tại điểm đón trả khách
Dấu hiệu trực tiếp: Xe phía trước phanh lại hoặc người có thể bước ra từ đầu xe buýt
Gợi ý xử lý: Giữ khoảng cách rộng hơn bình thường, giảm tốc và quan sát hai bên đầu xe buýt để phòng người đi bộ
Tình huống 4: Xe con từ đường nhánh đi ra
Dấu hiệu gián tiếp: Xuất hiện giao lộ hoặc đường nhánh nhỏ bên phải
Dấu hiệu trực tiếp: Đầu xe con nhô ra, có xu hướng nhập vào đường chính
Gợi ý xử lý: Nhả ga sớm, rà phanh nhẹ và sẵn sàng dừng nếu xe kia tiếp tục tiến ra
Tình huống 5: Xe máy chuyển làn
Dấu hiệu gián tiếp: Xe máy đi sát vạch phân làn, không giữ hướng ổn định
Dấu hiệu trực tiếp: Xe máy bất ngờ đánh lái sang làn của bạn
Gợi ý xử lý: Chủ động giảm tốc, giữ khoảng cách lệch sang phía an toàn để tránh va chạm
Tình huống 6: Xe buýt vượt
Dấu hiệu gián tiếp: Xe buýt phía sau tăng tốc, áp sát
Dấu hiệu trực tiếp: Xe buýt lấn sang làn của bạn để vượt
Gợi ý xử lý: Giảm tốc nhẹ để tạo khoảng trống, giữ hướng lái ổn định và quan sát gương
Tình huống 7: Người đi bộ phía trước
Dấu hiệu gián tiếp: Khu vực đông dân cư, gần vạch qua đường
Dấu hiệu trực tiếp: Xe phía trước phanh lại hoặc có người chuẩn bị sang đường
Gợi ý xử lý: Hạ tốc độ, giữ khoảng cách và chuẩn bị dừng hẳn nếu người đi bộ bước ra
Tình huống 8: Xe đạp từ đường nhánh
Dấu hiệu gián tiếp: Có lối nhỏ hoặc ngõ khuất bên đường
Dấu hiệu trực tiếp: Xe đạp bất ngờ lao ra từ bên hông
Gợi ý xử lý: Quan sát hai bên liên tục, giảm tốc sâu và giữ khoảng cách phòng va chạm ngang
Tình huống 9: Xe con vượt phía trước
Dấu hiệu gián tiếp: Xe phía trước chạy không ổn định, có xu hướng tăng tốc
Dấu hiệu trực tiếp: Xe đó lấn sang làn đối diện để vượt
Gợi ý xử lý: Không tăng tốc theo, giảm ga và giữ khoảng cách để tránh tình huống dồn xe
Tình huống 10: Xe con bên trái đi ra
Dấu hiệu gián tiếp: Có giao cắt bên trái nhưng tầm nhìn hạn chế
Dấu hiệu trực tiếp: Xe con tiến ra và có thể cắt ngang đầu xe bạn
Gợi ý xử lý: Giảm tốc chủ động, giữ chân phanh và sẵn sàng dừng nếu xe kia không nhường
Tình huống 11: Xe bê tông lấn làn
Dấu hiệu gián tiếp: Xe tải lớn chiếm nhiều diện tích mặt đường
Dấu hiệu trực tiếp: Xe bê tông lấn sang phần đường của bạn
Gợi ý xử lý: Giảm tốc và ép xe về phía an toàn (bên phải), tránh đi song song
Tình huống 12: Xe con rẽ trái
Dấu hiệu gián tiếp: Xe phía trước bật xi nhan trái
Dấu hiệu trực tiếp: Xe bắt đầu đánh lái qua hướng trái
Gợi ý xử lý: Giữ khoảng cách lớn hơn, giảm tốc để tránh bị cắt đầu
Tình huống 13: Xe đạp sang đường
Dấu hiệu gián tiếp: Có người đi xe đạp gần mép đường
Dấu hiệu trực tiếp: Xe đạp bắt đầu đi xuống lòng đường
Gợi ý xử lý: Giảm tốc sớm, không bấm còi gấp, giữ khoảng cách để họ sang hết
Tình huống 14: Đường hẹp có xe đối diện
Dấu hiệu gián tiếp: Đường hẹp, không đủ cho 2 xe tránh nhau dễ dàng
Dấu hiệu trực tiếp: Xe đối diện tiến vào đoạn hẹp cùng lúc
Gợi ý xử lý: Giảm tốc về mức an toàn, chủ động nhường nếu cần để tránh xung đột
Tình huống 15: Xe tải phanh gấp
Dấu hiệu gián tiếp: Xe tải phía trước ở khoảng cách gần
Dấu hiệu trực tiếp: Đèn phanh bật sáng đột ngột
Gợi ý xử lý: Đạp phanh dứt khoát nhưng êm, giữ khoảng cách để tránh va chạm liên hoàn
Tình huống 16: Xe từ nhánh trái đi ra
Dấu hiệu gián tiếp: Có giao lộ bên trái, tầm nhìn bị che
Dấu hiệu trực tiếp: Xe từ bên trái tiến gần ra đường chính
Gợi ý xử lý: Giảm tốc, quan sát sâu vào giao lộ và sẵn sàng dừng
Tình huống 17: Xe buýt vượt sai
Dấu hiệu gián tiếp: Xe buýt phía sau tăng tốc bất thường
Dấu hiệu trực tiếp: Xe buýt lấn làn vượt trong điều kiện không an toàn
Gợi ý xử lý: Giảm tốc để tránh đối đầu, giữ hướng xe ổn định
Tình huống 18: Xe mở cửa ven đường
Dấu hiệu gián tiếp: Có xe đỗ sát lề phải
Dấu hiệu trực tiếp: Cửa xe bất ngờ mở ra
Gợi ý xử lý: Giữ khoảng cách rộng với xe đỗ, giảm tốc khi đi sát
Tình huống 19: Xe mở cửa phía ngược chiều
Dấu hiệu gián tiếp: Xe đỗ bên kia đường, có dấu hiệu hoạt động
Dấu hiệu trực tiếp: Ánh đèn hoặc chuyển động bất thường từ xe đó
Gợi ý xử lý: Quan sát cả hai phía, giảm tốc để phòng cửa mở hoặc người băng qua
Tình huống 20: Xe mở cửa trong khu đông
Dấu hiệu gián tiếp: Nhiều xe đỗ hai bên đường
Dấu hiệu trực tiếp: Một xe mở cửa đột ngột
Gợi ý xử lý: Đi chậm đều, giữ khoảng cách hai bên và sẵn sàng phanh
Tình huống 21: Xe phía trước lùi
Dấu hiệu gián tiếp: Xe phía trước dừng lâu bất thường
Dấu hiệu trực tiếp: Đèn lùi bật và xe bắt đầu di chuyển ngược
Gợi ý xử lý: Dừng lại ở khoảng cách an toàn, không áp sát
Tình huống 22: Xe 16 chỗ từ nhánh
Dấu hiệu gián tiếp: Có xe lớn chờ tại giao lộ
Dấu hiệu trực tiếp: Xe bắt đầu tiến ra chiếm làn
Gợi ý xử lý: Giảm tốc sớm vì xe lớn khó quan sát, sẵn sàng nhường
Tình huống 23: Xe tải dừng che khuất
Dấu hiệu gián tiếp: Xe tải dừng giữa đường gây khuất tầm nhìn
Dấu hiệu trực tiếp: Xe khác lấn làn để tránh
Gợi ý xử lý: Không vượt ngay, giảm tốc và quan sát trước khi di chuyển tiếp
Tình huống 24: Xe mô tô đường dừng
Dấu hiệu gián tiếp: Xe chuyên dụng hoạt động trên đường
Dấu hiệu trực tiếp: Xe phía sau phải chuyển làn
Gợi ý xử lý: Giảm tốc và giữ khoảng cách để tránh va chạm bất ngờ
Tình huống 25: Xe buýt xin đường
Dấu hiệu gián tiếp: Xe buýt bật tín hiệu xin chuyển làn
Dấu hiệu trực tiếp: Xe bắt đầu chuyển sang làn bạn
Gợi ý xử lý: Chủ động giảm tốc để tạo khoảng trống an toàn
Tình huống 26: Đường đang thi công
Dấu hiệu gián tiếp: Có biển báo công trường từ xa
Dấu hiệu trực tiếp: Xuất hiện vật cản hoặc công nhân làm việc
Gợi ý xử lý: Giảm tốc sâu, đi đúng làn tạm và chú ý người điều tiết
Tình huống 27: Đèn đỏ chuyển xanh
Dấu hiệu gián tiếp: Đang dừng tại giao lộ
Dấu hiệu trực tiếp: Đèn tín hiệu chuyển sang xanh
Gợi ý xử lý: Không đi ngay, quan sát hai bên rồi mới tăng tốc theo đúng quy định
Tình huống 28: Đường trơn trượt
Dấu hiệu gián tiếp: Có biển cảnh báo, mặt đường bóng
Dấu hiệu trực tiếp: Xe trước có dấu hiệu trượt hoặc phanh
Gợi ý xử lý: Giảm ga từ sớm, tránh phanh gấp và giữ khoảng cách dài hơn
Tình huống 29: Đường nhiều ổ gà
Dấu hiệu gián tiếp: Mặt đường xấu, lồi lõm
Dấu hiệu trực tiếp: Xe phía trước giảm tốc hoặc né
Gợi ý xử lý: Hạ tốc độ và đi thẳng ổn định, tránh đánh lái gấp
Tình huống 30: Bò đứng giữa đường
Dấu hiệu gián tiếp: Khu vực nông thôn ít rào chắn
Dấu hiệu trực tiếp: Động vật đứng trên phần đường
Gợi ý xử lý: Giảm tốc sâu, bấm còi nhẹ nếu cần để cảnh báo
Tình huống 31: Bò di chuyển qua đường
Dấu hiệu gián tiếp: Có đàn vật nuôi gần đường
Dấu hiệu trực tiếp: Con vật bắt đầu băng qua
Gợi ý xử lý: Dừng hoặc đi rất chậm, không tăng tốc ép qua
Tình huống 32: Trẻ em sang đường
Dấu hiệu gián tiếp: Gần trường học, khu dân cư
Dấu hiệu trực tiếp: Trẻ bước xuống đường không quan sát
Gợi ý xử lý: Giảm tốc sớm, luôn sẵn sàng dừng và nhường đường
Tình huống 33: Trẻ em chơi gần đường
Dấu hiệu gián tiếp: Có trẻ chơi ở lề đường
Dấu hiệu trực tiếp: Trẻ chạy bất ngờ ra
Gợi ý xử lý: Đi rất chậm, giữ chân phanh để xử lý kịp
Tình huống 34: Xe khách vượt
Dấu hiệu gián tiếp: Xe khách phía sau tăng tốc
Dấu hiệu trực tiếp: Xe khách lấn làn để vượt
Gợi ý xử lý: Giảm tốc nhẹ, giữ ổn định để họ vượt an toàn
Tình huống 35: Xe tải lấn làn
Dấu hiệu gián tiếp: Khúc cua khuất tầm nhìn
Dấu hiệu trực tiếp: Xe tải lấn sang làn đường của bạn
Gợi ý xử lý: Giảm tốc, bám sát lề phải và giữ khoảng cách
Tình huống 36: Xe máy từ ngõ đi ra
Dấu hiệu gián tiếp: Có nhiều ngõ nhỏ
Dấu hiệu trực tiếp: Xe máy lao ra nhanh
Gợi ý xử lý: Quan sát hai bên liên tục và giảm tốc từ trước
Tình huống 37: Xe đạp từ ngõ đi ra
Dấu hiệu gián tiếp: Khu dân cư đông
Dấu hiệu trực tiếp: Xe đạp đi ra thiếu quan sát
Gợi ý xử lý: Giảm tốc sâu vì xe đạp khó kiểm soát
Tình huống 38: Xe máy lách qua xe lớn
Dấu hiệu gián tiếp: Có xe tải che khuất
Dấu hiệu trực tiếp: Xe máy bất ngờ chui ra
Gợi ý xử lý: Không đi sát xe lớn, giữ khoảng cách và giảm tốc
Tình huống 39: Xe tải sang đường
Dấu hiệu gián tiếp: Giao lộ rộng
Dấu hiệu trực tiếp: Xe tải băng ngang
Gợi ý xử lý: Giảm tốc và ưu tiên nhường vì xe lớn khó dừng
Tình huống 40: Xe máy xuất hiện sau xe tải
Dấu hiệu gián tiếp: Xe tải che khuất tầm nhìn
Dấu hiệu trực tiếp: Xe máy bất ngờ đi ra phía trước
Gợi ý xử lý: Rà phanh trước khi vượt xe tải, giữ khoảng cách an toàn
Tình huống 41: Xe con rẽ trái nhanh
Dấu hiệu gián tiếp: Giao lộ phía trước, xe có xu hướng tăng tốc
Dấu hiệu trực tiếp: Xe con đánh lái rẽ trái với tốc độ cao
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và quan sát hướng di chuyển của xe
Tình huống 42: Xe máy rẽ trái
Dấu hiệu gián tiếp: Có phương tiện phía trước bật tín hiệu rẽ
Dấu hiệu trực tiếp: Xe máy bắt đầu chuyển hướng sang trái
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và theo dõi hướng rẽ
Tình huống 43: Xe tải tránh thi công
Dấu hiệu gián tiếp: Khu vực có biển báo công trường
Dấu hiệu trực tiếp: Xe tải chuyển hướng tránh vật cản
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và quan sát
Tình huống 44: Xe con vượt ẩu
Dấu hiệu gián tiếp: Đường hẹp, xe phía trước tăng tốc
Dấu hiệu trực tiếp: Xe con lấn sang làn ngược chiều để vượt
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và giữ đúng phần đường
Tình huống 45: Xe tải vượt
Dấu hiệu gián tiếp: Xe tải phía sau có dấu hiệu tăng tốc
Dấu hiệu trực tiếp: Xe tải lấn làn để vượt
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và quan sát
Tình huống 46: Xe con xin vượt
Dấu hiệu gián tiếp: Xe phía sau bật tín hiệu xin vượt
Dấu hiệu trực tiếp: Xe tiến sát phía sau
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và quan sát gương
Tình huống 47: Xe cứu thương
Dấu hiệu gián tiếp: Nghe thấy tín hiệu còi ưu tiên
Dấu hiệu trực tiếp: Xe cứu thương tiến đến gần
Gợi ý xử lý: Giảm tốc, bật tín hiệu cảnh báo và nhường đường theo quy định
Tình huống 48: Xe chuyển làn
Dấu hiệu gián tiếp: Xe phía trước đi sát vạch kẻ đường
Dấu hiệu trực tiếp: Xe chuyển sang làn của bạn
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 49: Xe tải chuyển làn
Dấu hiệu gián tiếp: Xe lớn di chuyển gần làn
Dấu hiệu trực tiếp: Xe lấn sang làn của bạn
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 50: Xe tải cắt đầu
Dấu hiệu gián tiếp: Xe lớn ở phía trước bên cạnh
Dấu hiệu trực tiếp: Xe đột ngột chuyển hướng cắt ngang đầu xe
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 51: Xe đi ngược chiều
Dấu hiệu gián tiếp: Đường hai chiều không có dải phân cách
Dấu hiệu trực tiếp: Xe đối diện lấn sang phần đường của bạn
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và đi sát về bên phải
Tình huống 52: Xe lùi trên cao tốc
Dấu hiệu gián tiếp: Xe phía trước di chuyển bất thường
Dấu hiệu trực tiếp: Xe bật đèn lùi và di chuyển ngược
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và chỉ dừng xe khi cần thiết
Tình huống 53: Xe ngược chiều bị che khuất
Dấu hiệu gián tiếp: Có xe lớn che khuất tầm nhìn phía trước
Dấu hiệu trực tiếp: Xe đối diện bất ngờ xuất hiện
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và quan sát
Tình huống 54: Xe tải nhập làn
Dấu hiệu gián tiếp: Có làn đường nhập
Dấu hiệu trực tiếp: Xe tải di chuyển vào làn chính
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 55: Xe tải tránh vật cản
Dấu hiệu gián tiếp: Có vật cản trên đường
Dấu hiệu trực tiếp: Xe tải đánh lái tránh
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 56: Xe con xin đường
Dấu hiệu gián tiếp: Xe phía sau áp sát
Dấu hiệu trực tiếp: Có tín hiệu xin đường
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và quan sát
Tình huống 57: Đường đang thi công
Dấu hiệu gián tiếp: Có biển báo công trường
Dấu hiệu trực tiếp: Xuất hiện rào chắn hoặc vật cản
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và đi đúng hướng dẫn
Tình huống 58: Đường thi công tiếp
Dấu hiệu gián tiếp: Công trường kéo dài
Dấu hiệu trực tiếp: Xe phía trước di chuyển chậm
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 59: Xe tải chuyển làn
Dấu hiệu gián tiếp: Xe lớn phía trước
Dấu hiệu trực tiếp: Xe chuyển sang làn khác
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 60: Xe 16 chỗ vào làn
Dấu hiệu gián tiếp: Xe lớn ở đường bên
Dấu hiệu trực tiếp: Xe chuyển vào làn của bạn
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 61: Xe con nhập làn
Dấu hiệu gián tiếp: Đường nhập làn
Dấu hiệu trực tiếp: Xe đi vào làn chính
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 62: Xe đối diện nháy đèn
Dấu hiệu gián tiếp: Xe đối diện có tín hiệu đèn
Dấu hiệu trực tiếp: Nháy đèn liên tục
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và quan sát
Tình huống 63: Bò qua đường
Dấu hiệu gián tiếp: Khu vực nông thôn
Dấu hiệu trực tiếp: Bò di chuyển qua đường
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 64: Đường đèo núi
Dấu hiệu gián tiếp: Đường quanh co, dốc
Dấu hiệu trực tiếp: Xe đối diện xuất hiện
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 65: Đường cong ban đêm
Dấu hiệu gián tiếp: Tầm nhìn hạn chế
Dấu hiệu trực tiếp: Không quan sát rõ phía trước
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và bật tín hiệu cảnh báo
Tình huống 66: Xe tải làm rơi vật
Dấu hiệu gián tiếp: Xe tải chở hàng
Dấu hiệu trực tiếp: Vật rơi xuống đường
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 67: Dê đứng ven đường
Dấu hiệu gián tiếp: Khu vực nông thôn
Dấu hiệu trực tiếp: Dê có thể lao ra
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 68: Sương mù dày
Dấu hiệu gián tiếp: Tầm nhìn bị hạn chế
Dấu hiệu trực tiếp: Quan sát khó khăn
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và bật tín hiệu cảnh báo
Tình huống 69: Xe chạy nhanh trong đường cong
Dấu hiệu gián tiếp: Đường cong nguy hiểm
Dấu hiệu trực tiếp: Xe đối diện lao nhanh
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 70: Đường cong ban ngày
Dấu hiệu gián tiếp: Có biển cảnh báo
Dấu hiệu trực tiếp: Tầm nhìn bị khuất
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 71: Đường cong liên tiếp
Dấu hiệu gián tiếp: Đường uốn lượn
Dấu hiệu trực tiếp: Khó quan sát xa
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 72: Sương mù tiếp
Dấu hiệu gián tiếp: Tầm nhìn giảm
Dấu hiệu trực tiếp: Không nhìn rõ
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 73: Đường cong khuất
Dấu hiệu gián tiếp: Có vật che tầm nhìn
Dấu hiệu trực tiếp: Không thấy phía trước
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 74: Xe đạp sang đường
Dấu hiệu gián tiếp: Có xe đạp gần đường
Dấu hiệu trực tiếp: Xe đạp đi xuống đường
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 75: Trẻ em sang đường
Dấu hiệu gián tiếp: Khu dân cư
Dấu hiệu trực tiếp: Trẻ bước ra
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và nhường đường cho người đi bộ
Tình huống 76: Trẻ chạy ra đường
Dấu hiệu gián tiếp: Có trẻ gần đường
Dấu hiệu trực tiếp: Trẻ chạy ra bất ngờ
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 77: Xe con sang đường
Dấu hiệu gián tiếp: Giao cắt
Dấu hiệu trực tiếp: Xe băng ngang
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 78: Xe máy vượt đèn
Dấu hiệu gián tiếp: Giao lộ
Dấu hiệu trực tiếp: Xe vượt đèn tín hiệu
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 79: Xe máy từ nhánh ra
Dấu hiệu gián tiếp: Có ngõ nhỏ
Dấu hiệu trực tiếp: Xe đi ra
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 80: Đường ổ gà
Dấu hiệu gián tiếp: Mặt đường xấu
Dấu hiệu trực tiếp: Xe phía trước né tránh
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 81: Xe phía trước giảm tốc bất thường
Dấu hiệu gián tiếp: Xe chạy không ổn định, có xu hướng chậm lại
Dấu hiệu trực tiếp: Đèn phanh bật liên tục
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và quan sát tình huống phía trước
Tình huống 82: Xe phía trước dừng đột ngột
Dấu hiệu gián tiếp: Khoảng cách giữa các xe bị thu hẹp
Dấu hiệu trực tiếp: Xe phía trước dừng lại
Gợi ý xử lý: Giảm tốc kịp thời, giữ khoảng cách an toàn để tránh va chạm
Tình huống 83: Xe phía trước bật tín hiệu rẽ phải
Dấu hiệu gián tiếp: Xe đi sát lề phải
Dấu hiệu trực tiếp: Xe bật xi nhan phải và giảm tốc
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và quan sát hướng rẽ
Tình huống 84: Xe phía trước bật tín hiệu rẽ trái
Dấu hiệu gián tiếp: Xe có xu hướng dịch sang trái
Dấu hiệu trực tiếp: Xe bật xi nhan trái
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 85: Xe phía trước quay đầu
Dấu hiệu gián tiếp: Xe giảm tốc gần điểm quay đầu
Dấu hiệu trực tiếp: Xe đánh lái quay đầu
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và quan sát
Tình huống 86: Xe taxi dừng đón khách
Dấu hiệu gián tiếp: Xe taxi chạy chậm gần lề đường
Dấu hiệu trực tiếp: Xe dừng lại đột ngột
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và quan sát người lên xuống
Tình huống 87: Xe công nghệ dừng đột ngột
Dấu hiệu gián tiếp: Xe di chuyển không ổn định
Dấu hiệu trực tiếp: Xe dừng để đón trả khách
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 88: Xe phía trước chuyển hướng liên tục
Dấu hiệu gián tiếp: Xe không giữ làn ổn định
Dấu hiệu trực tiếp: Xe đánh lái nhiều lần
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và quan sát
Tình huống 89: Xe phía trước có dấu hiệu hỏng
Dấu hiệu gián tiếp: Xe chạy chậm bất thường
Dấu hiệu trực tiếp: Xe bật tín hiệu cảnh báo
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và quan sát
Tình huống 90: Xe phía trước chở hàng cồng kềnh
Dấu hiệu gián tiếp: Hàng hóa vượt quá kích thước
Dấu hiệu trực tiếp: Hàng rung lắc
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 91: Xe tải đổ dốc
Dấu hiệu gián tiếp: Đường dốc dài
Dấu hiệu trực tiếp: Xe tăng tốc nhanh
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 92: Xe container quay đầu
Dấu hiệu gián tiếp: Xe lớn ở khu vực quay đầu
Dấu hiệu trực tiếp: Xe bắt đầu xoay đầu xe
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 93: Xe phía trước phanh liên tục
Dấu hiệu gián tiếp: Xe chạy không đều
Dấu hiệu trực tiếp: Đèn phanh bật nhiều lần
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 94: Xe phía trước tránh ổ gà
Dấu hiệu gián tiếp: Đường xấu
Dấu hiệu trực tiếp: Xe đánh lái tránh
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 95: Xe phía trước bị che khuất
Dấu hiệu gián tiếp: Có xe lớn chắn tầm nhìn
Dấu hiệu trực tiếp: Không thấy rõ phía trước
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và quan sát
Tình huống 96: Xe phía trước đi chậm
Dấu hiệu gián tiếp: Tốc độ thấp bất thường
Dấu hiệu trực tiếp: Xe giữ tốc độ thấp
Gợi ý xử lý: Giảm tốc phù hợp, giữ khoảng cách an toàn
Tình huống 97: Xe phía trước dừng tại vạch
Dấu hiệu gián tiếp: Giao lộ có đèn tín hiệu
Dấu hiệu trực tiếp: Xe dừng đúng vạch
Gợi ý xử lý: Giảm tốc và dừng xe theo đúng quy định
Tình huống 98: Xe phía trước vượt đèn vàng
Dấu hiệu gián tiếp: Gần đèn tín hiệu
Dấu hiệu trực tiếp: Xe tăng tốc vượt
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 99: Xe phía trước chuyển làn không tín hiệu
Dấu hiệu gián tiếp: Xe đi sát vạch
Dấu hiệu trực tiếp: Xe chuyển làn đột ngột
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 100: Xe phía trước lấn làn
Dấu hiệu gián tiếp: Xe không giữ đúng phần đường
Dấu hiệu trực tiếp: Xe lấn sang làn khác
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 101: Xe phía trước chở vật liệu rơi
Dấu hiệu gián tiếp: Xe chở hàng rời
Dấu hiệu trực tiếp: Vật liệu rơi xuống
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 102: Xe phía trước quay đầu sai
Dấu hiệu gián tiếp: Không đúng nơi quay đầu
Dấu hiệu trực tiếp: Xe quay đầu đột ngột
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 103: Xe phía trước dừng giữa đường
Dấu hiệu gián tiếp: Không vào lề
Dấu hiệu trực tiếp: Xe dừng đột ngột
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 104: Xe phía trước có người xuống xe
Dấu hiệu gián tiếp: Xe dừng
Dấu hiệu trực tiếp: Cửa mở, người bước xuống
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 105: Xe phía trước có trẻ em
Dấu hiệu gián tiếp: Có ghế trẻ em hoặc hành khách
Dấu hiệu trực tiếp: Trẻ có thể xuống xe
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 106: Xe phía trước rẽ vào ngõ
Dấu hiệu gián tiếp: Có ngõ nhỏ
Dấu hiệu trực tiếp: Xe giảm tốc và rẽ
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 107: Xe phía trước tránh người đi bộ
Dấu hiệu gián tiếp: Có người gần đường
Dấu hiệu trực tiếp: Xe phanh
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và nhường đường cho người đi bộ
Tình huống 108: Xe phía trước tránh xe khác
Dấu hiệu gián tiếp: Giao thông đông
Dấu hiệu trực tiếp: Xe đánh lái
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 109: Xe phía trước bị ùn tắc
Dấu hiệu gián tiếp: Xe đông dần
Dấu hiệu trực tiếp: Xe dừng hàng loạt
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 110: Xe phía trước đi vào đường hẹp
Dấu hiệu gián tiếp: Đường nhỏ lại
Dấu hiệu trực tiếp: Xe giảm tốc
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 111: Xe phía trước qua cầu hẹp
Dấu hiệu gián tiếp: Cầu nhỏ
Dấu hiệu trực tiếp: Xe đi chậm
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 112: Xe phía trước qua đường trơn
Dấu hiệu gián tiếp: Mặt đường ướt
Dấu hiệu trực tiếp: Xe giảm tốc
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 113: Xe phía trước vào khúc cua
Dấu hiệu gián tiếp: Đường cong
Dấu hiệu trực tiếp: Xe đánh lái
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 114: Xe phía trước bị che khuất bởi sương
Dấu hiệu gián tiếp: Tầm nhìn hạn chế
Dấu hiệu trực tiếp: Không thấy rõ
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và bật tín hiệu cảnh báo
Tình huống 115: Xe phía trước đi ban đêm
Dấu hiệu gián tiếp: Ánh sáng yếu
Dấu hiệu trực tiếp: Tầm nhìn kém
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 116: Xe phía trước bật đèn pha
Dấu hiệu gián tiếp: Bị chói mắt
Dấu hiệu trực tiếp: Ánh sáng mạnh
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 117: Xe phía trước đi chậm bất thường
Dấu hiệu gián tiếp: Không rõ nguyên nhân
Dấu hiệu trực tiếp: Xe giảm tốc
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 118: Xe phía trước tránh chướng ngại vật
Dấu hiệu gián tiếp: Có vật trên đường
Dấu hiệu trực tiếp: Xe đánh lái
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 119: Xe phía trước vào khu dân cư
Dấu hiệu gián tiếp: Có biển báo
Dấu hiệu trực tiếp: Xe giảm tốc
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn
Tình huống 120: Xe phía trước qua trường học
Dấu hiệu gián tiếp: Có biển cảnh báo
Dấu hiệu trực tiếp: Có học sinh
Gợi ý xử lý: Giảm tốc, giữ khoảng cách an toàn và nhường đường cho người đi bộ
`;

const lines = rawData.split('\n').filter(l => l.trim() !== '');
const situations = [];
let currentSituation = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('Tình huống ')) {
    if (Object.keys(currentSituation).length > 0) {
      situations.push(currentSituation);
    }
    const match = line.match(/Tình huống (\d+): (.*)/);
    if (match) {
      currentSituation = {
        id: parseInt(match[1]),
        name: match[2].trim(),
        indirect: '',
        direct: '',
        action: ''
      };
    }
  } else if (line.startsWith('Dấu hiệu gián tiếp: ')) {
    currentSituation.indirect = line.replace('Dấu hiệu gián tiếp: ', '').trim();
  } else if (line.startsWith('Dấu hiệu trực tiếp: ')) {
    currentSituation.direct = line.replace('Dấu hiệu trực tiếp: ', '').trim();
  } else if (line.startsWith('Gợi ý xử lý: ')) {
    currentSituation.action = line.replace('Gợi ý xử lý: ', '').trim();
  }
}
if (Object.keys(currentSituation).length > 0) {
  situations.push(currentSituation);
}

fs.writeFileSync('src/data.json', JSON.stringify(situations, null, 2), 'utf8');
