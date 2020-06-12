from rest_framework import serializers
from django.contrib.auth import authenticate
# from django.contrib.auth.models import User


from .models import Trip,User,Review
from django.db.models import Avg, Max, Min, Sum
# //login serializers
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password =  serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        return serializers.ValidationError("Incorect Credential")
        # return super().validate(attrs)

# register serializers
class RegisterSerilizer(serializers.ModelSerializer):
    pic = serializers.ImageField(default=None)
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'password',
            'is_driver',
            'tel_no',
            'pic'
        )
        extra_kwargs={'password':{'write_only':True}}
    def create(self, validated_data):
        # return super().create(validated_data)
        t = True
        user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'],is_driver=t)
        user.tel_no = validated_data['tel_no']
        user.pic =validated_data['pic']
        user.save()
        return user
#register rider serializer 
class RegisterRiderSerilizer(serializers.ModelSerializer):
    # pic = serializers.ImageField(default=None)
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'password',
            'is_rider',
            'tel_no',
            'pic'
        )
        extra_kwargs={'password':{'write_only':True}}
    def create(self, validated_data):
        # return super().create(validated_data)
        t = True
        user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'],is_rider=t)
        user.tel_no = validated_data['tel_no']
        user.pic = validated_data['pic']
        user.save()
        return user
# user serializer
class UserSerilizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'tel_no',
            'is_driver',
            'is_rider',
            'pic'
        )
class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self,value):
        return value
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = (
            "id",
            "courtesy",
            "ride"
        )
class TripSerializer(serializers.ModelSerializer):
    driver = serializers.SerializerMethodField()
    review = serializers.SerializerMethodField()
    # driver = UserSerializer()
    # rider = StringSerializer()
    class Meta:
        model = Trip
        fields = (
            'id',
            'created',
            'updated',
            'pick_up_address',
            'drop_off_address',
            'status',
            'driver',
            'rider',
            'kms',
            'price',
            'capacity',
            'geo_location',
            'geo_location_lat',
            'geo_location_long',
            'to_point',
            'take_off_time',
            'drop_lat',
            'drop_lng',
            'take_off',
            'take_off_date',
        )
        read_only_fields = ('id','created','updated',)
    def get_driver(self,obj):
        return UserSerilizer(obj.driver).data
    
class ReadOnlyTripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'
        read_only_fields = (
            'id',
            'created',
            'updated',
            'pick_up_address',
            'drop_off_address',
            'status',
            'driver',
            'rider',
            'kms',
            'price',
            'capacity',
            'geo_location',
            'geo_location_lat',
            'geo_location_long',
            'to_point'
        )
