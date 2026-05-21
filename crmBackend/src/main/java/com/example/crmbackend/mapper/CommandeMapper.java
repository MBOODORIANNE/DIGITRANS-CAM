package com.example.crmbackend.mapper;

import com.example.crmbackend.dto.request.LigneCommandeRequest;
import com.example.crmbackend.dto.response.CommandeResponse;
import com.example.crmbackend.dto.response.LigneCommandeResponse;
import com.example.crmbackend.entity.Commande;
import com.example.crmbackend.entity.LigneCommande;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = true))
public interface CommandeMapper {
    @Mapping(source = "client.id", target = "clientId")
    @Mapping(source = "restaurant.id", target = "restaurantId")
    CommandeResponse toResponse(Commande c);

    List<CommandeResponse> toResponseList(List<Commande> list);

    LigneCommandeResponse toResponse(LigneCommande ligne);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "commande", ignore = true)
    LigneCommande toEntity(LigneCommandeRequest req);
}
