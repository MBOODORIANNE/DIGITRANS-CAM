package com.example.crmbackend.mapper;

import com.example.crmbackend.dto.request.RestaurantRequest;
import com.example.crmbackend.dto.response.RestaurantResponse;
import com.example.crmbackend.entity.Restaurant;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, builder = @Builder(disableBuilder = true))
public interface RestaurantMapper {
    RestaurantResponse toResponse(Restaurant r);
    List<RestaurantResponse> toResponseList(List<Restaurant> list);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Restaurant toEntity(RestaurantRequest req);

    void updateEntity(RestaurantRequest req, @MappingTarget Restaurant r);
}
