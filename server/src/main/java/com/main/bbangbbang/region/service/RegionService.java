package com.main.bbangbbang.region.service;

import com.main.bbangbbang.region.entity.Region;
import com.main.bbangbbang.region.repository.RegionRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class RegionService {
    private final RegionRepository regionRepository;

    @Transactional(readOnly = true)
    public List<Region> findAllSubRegions(String regionName) {
        List<Region> subRegions = new ArrayList<>();
        List<Region> likeRegions = findRegions(regionName);
        for (Region region : likeRegions) {
            subRegions.addAll(findChildRegions(region));
        }

        subRegions = subRegions.stream()
                .distinct()
                .collect(Collectors.toList());

        return subRegions;
    }

    private List<Region> findRegions(String regionName) {

        return regionRepository.findByRegionNameStartsWith(regionName);
    }

    private List<Region> findChildRegions(Region region) {

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
