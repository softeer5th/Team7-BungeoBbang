package com.bungeobbang.backend.common.util;

import org.bson.types.ObjectId;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public abstract class ObjectIdTimestampConverter {
    public static LocalDateTime getLocalDateTimeFromObjectId(ObjectId objectId) {
        return LocalDateTime.ofInstant(Instant.ofEpochSecond(objectId.getTimestamp()), ZoneId.of("Asia/Seoul"));
    }
}
