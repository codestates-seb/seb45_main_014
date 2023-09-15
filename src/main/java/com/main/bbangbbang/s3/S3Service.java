package com.main.bbangbbang.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.main.bbangbbang.exception.BusinessLogicException;
import com.main.bbangbbang.exception.ExceptionCode;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class S3Service {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;
    private static final List<String> IMAGE_EXTENSIONS = List.of("png", "jpg", "jpeg", "bmp", "svg", "webp");
    private static final long MAX_FILE_SIZE = 1024*1024*10;

    public String uploadImage(MultipartFile file, String directory, Long id) {
        validateExtension(file);
        validateSize(file);

        String fileName = directory +"/"+id+"."+file.getOriginalFilename();
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());

        try (InputStream inputStream = file.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
        }

        return amazonS3.getUrl(bucket, fileName).toString();
    }

    private void validateExtension(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        String extension = fileName.substring(fileName.lastIndexOf(".")+1);
        if (!IMAGE_EXTENSIONS.contains(extension)) throw new BusinessLogicException(ExceptionCode.IMPROPER_EXTENSION);
    }

    private void validateSize(MultipartFile file) {
        long fileSize = file.getSize();
        if (fileSize > MAX_FILE_SIZE) throw new BusinessLogicException(ExceptionCode.BIG_FILE);
    }
}
