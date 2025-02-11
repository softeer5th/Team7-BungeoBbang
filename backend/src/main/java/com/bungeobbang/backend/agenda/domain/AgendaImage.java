package com.bungeobbang.backend.agenda.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class AgendaImage {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne (fetch = LAZY)
    @JoinColumn(name = "agenda_id")
    private Agenda agenda;

    @Column(nullable = false, unique = true)
    private String name;

    @Builder
    public AgendaImage(Long id, Agenda agenda, String name) {
        this.id = id;
        this.agenda = agenda;
        this.name = name;
    }
}
