package com.yas.product.repository;

import com.yas.product.model.ProductImage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    void deleteByImageIdInAndProductId(List<Long> imageIds, Long productId);
}
