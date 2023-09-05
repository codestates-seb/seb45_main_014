package com.main.bbangbbang.region.repository;

import com.main.bbangbbang.region.entity.Region;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, Long> {
    Region findByRegionName(String regionName);
    List<Region> findByParentId(Long parentId);
}
