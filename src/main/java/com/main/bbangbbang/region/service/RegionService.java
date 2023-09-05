package com.main.bbangbbang.region.service;

import com.main.bbangbbang.region.entity.Region;
import com.main.bbangbbang.region.repository.RegionRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class RegionService {
    private final RegionRepository regionRepository;

    @Transactional(readOnly = true)
    public Region findRegion(String regionName) {

        return regionRepository.findByRegionName(regionName);  // like 검색 필요할 것 같음
    }

    @Transactional(readOnly = true)
    public List<Region> findChildRegions(String regionName) {
        Region region = findRegion(regionName);

        return findChildRegions(new ArrayList<>(List.of(region)), region.getId());
    }

    private List<Region> findChildRegions(List<Region> result, Long parentId) {
        List<Region> regions = regionRepository.findByParentId(parentId);
        result.addAll(regions);
        for (Region region : regions) {
            findChildRegions(result, region.getId());
        }

        return result;
    }
}
