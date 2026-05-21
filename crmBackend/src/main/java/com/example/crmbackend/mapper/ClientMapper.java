package com.example.crmbackend.mapper;

import com.example.crmbackend.dto.request.ClientRequest;
import com.example.crmbackend.dto.response.ClientResponse;
import com.example.crmbackend.entity.Client;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, builder = @Builder(disableBuilder = true))
public interface ClientMapper {
    ClientResponse toResponse(Client c);
    List<ClientResponse> toResponseList(List<Client> list);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "actif", constant = "true")
    @Mapping(target = "dateInscription", ignore = true)
    Client toEntity(ClientRequest req);

    void updateEntity(ClientRequest req, @MappingTarget Client client);
}
